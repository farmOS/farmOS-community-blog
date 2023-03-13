---
title: Introduction to Python Scripting with farmOS
date: 2023-03-13
author: Symbioquine
slug: 2023/quick-intro-to-python-scripting
---

# Introduction to Python Scripting with farmOS.py

Although farmOS has a convenient web interface that is useful for record keeping
and reference tasks by humans, sometimes it is necessary to programmatically
read or write farmOS data. One of the libraries that facilitates that is
[farmOS.py](https://github.com/farmOS/farmOS.py/), the official Python API for
farmOS. The documentation for farmOS.py can be found online
[here at farmOS.org](https://farmos.org/development/farmos-py/). This post will
have significant overlap with those docs, but will attempt to provide a slightly
more applied and prescriptive introduction to Python scripting with farmOS.

This tutorial will use a tool called Poetry to help set up a Python development
environment. See https://python-poetry.org/docs/ for set up instructions.

```shell
mkdir farm_python_scripting_tutorial && cd farm_python_scripting_tutorial
poetry init
poetry add "farmOS^1"
```

## Initialization

This first example is useful for testing whether farmOS.py is installed
correctly and can connect to farmOS.

**initialization_example.py**

```python
from farmOS import farmOS

farm_client = farmOS(
    hostname= "https://farm.example.com",
    client_id = "farm",
    scope = "farm_manager",
)

farm_client.authorize(
    # Omit username/password args for an interactive prompt
    # username='admin',
    # password='test',
)

print("farmOS.py successfully initialized for farm: '{farm_detail[name]}' @ \n\t'{farm_detail[url]}' running version {farm_detail[version]}"
    .format(farm_detail=info['meta']['farm']))
```

To run it in our poetry environment, we can do:

```shell
poetry run python initialization_example.py
```

Which prints something like:

```
farmOS.py successfully initialized for farm: 'Example Farm' @
    'https://farm.example.com' running version 2.0.0
```

### Aside About Self-signed Certificates

If you are experimenting with farmOS using a self-signed certificate and get an
SSLError like; ```requests.exceptions.SSLError: HTTPSConnectionPool(host='farm.example.com', port=443): Max retries exceeded with url: /oauth/token (Caused by SSLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:997)')))```

You may need to export an environment variable to tell Python where to find your
root CA certificate:

```shell
export REQUESTS_CA_BUNDLE=/path/to/your/rootCA.pem
```

## Simple Data Reporting/Analysis

This next example is a little more involved. It demonstrates using farmOS.py to
get all the active animal assets and print out a plaintext report of the number
of animals by age in years and sex.

**livestock_report_example.py**

```python
from collections import defaultdict
from datetime import datetime, timezone
from farmOS import farmOS

farm_client = farmOS(
    hostname= "https://farm.example.com",
    client_id = "farm",
    scope = "farm_manager",
)

farm_client.authorize(
    # Omit username/password args for an interactive prompt
    # username='admin',
    # password='test',
)

# Maintain a nested dictionary of the number of animals first
# by years age and then by sex
animals_by_years_age_and_sex = defaultdict(
    lambda: dict(M=0, F=0, NA=0))

# Get the current UTC date for comparing animal birth dates
# against
now = datetime.now(tz=timezone.utc)

# Only consider animals that are not archived
filters = farm_client.filter('status', 'active')

# Loop over each animal
for animal in farm_client.asset.iterate('animal', params=filters):
    # Parse the animal's date of birth as a Python datetime object
    date_of_birth = datetime.fromisoformat(animal['attributes']['birthdate'])

    # Get the animal's sex as a string
    sex = animal['attributes']['sex'] or "NA"

    # Compute the animal age in years as an integer
    years_age = (now - date_of_birth).days // 365

    # Add 1 for each animal of a given age and sex to the appropriate dictionary entry
    animals_by_years_age_and_sex[years_age][sex] += 1

# Print out the results sorted by the age
print('Age\tCounts')
for years_age in sorted(animals_by_years_age_and_sex.keys()):
    print(years_age, "\t", animals_by_years_age_and_sex[years_age])

```

To run it:

```shell
poetry run python livestock_report_example.py
```

Should print something like:

```
Age     Counts
0        {'M': 7, 'F': 8, 'NA': 9}
1        {'M': 8, 'F': 7, 'NA': 8}
2        {'M': 7, 'F': 29, 'NA': 1}
3        {'M': 6, 'F': 1, 'NA': 0}
5        {'M': 1, 'F': 0, 'NA': 0}
7        {'M': 3, 'F': 0, 'NA': 0}
```

## Importing Data

This next example demonstrates how we can use farmOS.py to bulk create data
from another source - in this case a CSV file.

**animals.csv**

```csv
animal_name,animal_dob,animal_sex
alice,2021/01/18,F
bob,2021/03/12,M
curt,2020/05/01,M
dolly,2021/06/08,F
```

**import_animals.py**

```python
import csv
from datetime import datetime
from farmOS import farmOS

farm_client = farmOS(
    hostname= "https://farm.example.com",
    client_id = "farm",
    scope = "farm_manager",
)

farm_client.authorize(
    # Omit username/password args for an interactive prompt
    # username='admin',
    # password='test',
)

# Get the first animal type which is named 'Sheep' or else None
animal_type_search = farm_client.term.iterate(
    'animal_type',
    params=farm_client.filter('name', 'Sheep'),
)
sheep_animal_type = next(iter(animal_type_search), None)

# If the sheep animal type does not already exist, create it
if sheep_animal_type is None:
    term_create_response = farm_client.term.send(
        'animal_type',
        {"attributes": {"name": "Sheep"}}
    )
    sheep_animal_type = term_create_response["data"]

with open('animals.csv', newline='') as csvfile:
    csv_reader = csv.DictReader(csvfile)
    for animal in csv_reader:
        animal_dob = datetime.strptime(animal['animal_dob'], "%Y/%m/%d")

        # Create the animal
        animal_create_response = farm_client.asset.send('animal', {
            "attributes": {
                "name": animal['animal_name'],
                "sex": animal['animal_sex'],
                "birthdate": animal_dob.strftime('%Y-%m-%dT%H:%M:%S+00:00'),
            },
            "relationships": {
                "animal_type": {
                    # Make each animal a Sheep
                    "data": {
                        "type": sheep_animal_type['type'],
                        "id": sheep_animal_type['id'],
                    },
                },
            },
        })

        print("Created {!r}: {}/asset/{}".format(
            animal['animal_name'],
            farm_client.session.hostname,
            animal_create_response['data']['attributes']['drupal_internal__id'],
        ))

```

To run it:

```shell
poetry run python import_animals.py
```

Should print something like:

```
Created 'alice': https://farm.example.com/asset/4406
Created 'bob': https://farm.example.com/asset/4407
Created 'curt': https://farm.example.com/asset/4408
Created 'dolly': https://farm.example.com/asset/4409
```

## Programmatically Manipulating Data

This final example demonstrates both reading and modifying farmOS data using
farmOS.py. It loops over all the plant assets from the previous season (e.g.
"2022"), creating a harvest log for each, then archiving the plant asset.

**harvest_and_archive_last_season_crops.py**

```python
from datetime import datetime, timezone
from farmOS import farmOS

farm_client = farmOS(
    hostname= "https://farm.example.com",
    client_id = "farm",
    scope = "farm_manager",
)

farm_client.authorize(
    # Omit username/password args for an interactive prompt
    # username='admin',
    # password='test',
)

# Get the current UTC date for the harvest log dates and season name
now = datetime.now(tz=timezone.utc)

# Only consider plants that are not archived
filters = {
    **farm_client.filter('status', 'active'),
    **farm_client.filter('season.name', str(now.year - 1)),
}

# Loop over each plant and create a harvest log + update
# the plant to now be archived
for plant in farm_client.asset.iterate('plant', params=filters):
    print("Harvesting and archiving:", plant['attributes']['name'])

    # Create a harvest log
    log_create_response = farm_client.log.send('harvest', {
        "attributes": {
            "name": "Harvest {}".format(plant['attributes']['name']),
            "timestamp": now.isoformat(timespec='seconds'),
        },
        "relationships": {
            "asset": {
                # Make each harvest log reference the current plant
                "data": [
                    {
                        "type": plant['type'],
                        "id": plant['id'],
                    },
                ],
            },
        },
    })

    # Update the plant to be archived
    farm_client.asset.send('plant', {
        'id': plant["id"],
        "attributes": {
            "status": "archived",
        }
    })

    print("\tCreated log {!r}: {}/log/{}".format(
        log_create_response['data']['attributes']['name'],
        farm_client.session.hostname,
        log_create_response['data']['attributes']['drupal_internal__id'],
    ))
```

To run it:

```shell
poetry run python harvest_and_archive_last_season_crops.py
```

Should print something like;

```
Harvesting and archiving: 2022 L13 PI 358607 Black Pea
        Created log 'Harvest 2022 L13 PI 358607 Black Pea': https://farm.example.com/log/10388
Harvesting and archiving: 2022 L13 W6 15041 Black Pea
        Created log 'Harvest 2022 L13 W6 15041 Black Pea': https://farm.example.com/log/10389
Harvesting and archiving: 2022 L15 PI 510585 Murado Alverja Violeta
        Created log 'Harvest 2022 L15 PI 510585 Murado Alverja Violeta': https://farm.example.com/log/10390
Harvesting and archiving: 2022 L15 PI 618625 Papago
        Created log 'Harvest 2022 L15 PI 618625 Papago': https://farm.example.com/log/10391
Harvesting and archiving: 2022 L15 Sormlandsk bonart
        Created log 'Harvest 2022 L15 Sormlandsk bonart': https://farm.example.com/log/10392
Harvesting and archiving: 2022 L15 Sugar Snap
        Created log 'Harvest 2022 L15 Sugar Snap': https://farm.example.com/log/10393
Harvesting and archiving: 2022 L15 Svalov's Belloart
        Created log "Harvest 2022 L15 Svalov's Belloart": https://farm.example.com/log/10394
...
```

## Conclusion

Hopefully these examples have been both instructive and inspiring. To learn
more, make sure to check out the
[farmOS.py documentation](https://farmos.org/development/farmos-py/) along with
the [farmOS API documentation](https://farmos.org/development/api/) and the
[Drupal JSON:API documentation](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module).
