---
title: Introduction to Python Scripting with farmOS
date: 2023-03-10
author: Symbioquine
slug: 2023/quick-intro-to-python-scripting
---

# Introduction to Python Scripting with farmOS.py

Although farmOS has a convenient web interface that is useful for record keeping and reference tasks by humans, sometimes it is
necessary to programmatically read or write farmOS data. One of the libraries that facilitates that is farmOS.py, the official
Python API for farmOS. The documentation for farmOS.py can be found online [here at farmOS.org](https://farmos.org/development/farmos-py/).
This post will have significant overlap with those docs, but will attempt to provide a slightly more applied and prescriptive introduction
to Python scripting with farmOS.

This tutorial will use a tool called Poetry to help set up a Python development environment. See https://python-poetry.org/docs/ for set up
instructions.

```shell
mkdir farm_python_scripting_tutorial && cd farm_python_scripting_tutorial
poetry init
poetry add "farmOS^1.0.0b"
```

## `initialization_example.py`

```python
from farmOS import farmOS

farm_client = farmOS(
    hostname= "https://farm.example.com",
    client_id = "farm",
    scope = "farm_manager",
)

farm_client.authorize(
    # Leave the next two lines commented out for an interactive username/password prompt
    # username='admin',
    # password='test',
)

print("farmOS.py successfully initialized for farm: '{farm_detail[name]}' @ '{farm_detail[url]}' running version {farm_detail[version]}"
    .format(farm_detail=info['meta']['farm']))
```

This first example is useful for testing whether farmOS.py is installed correctly and can connect to farmOS.

To run it in our poetry environment, we can do:

```shell
poetry run python initialization_example.py
```

Which prints something like:

```
farmOS.py successfully initialized for farm: 'Example Farm' @ 'https://farm.example.com' running version 2.0.0
```

### Aside About Self-signed Certificates

If you are experimenting with farmOS using a self-signed certificate and get an SSLError;

```
requests.exceptions.SSLError: HTTPSConnectionPool(host='farm.example.com', port=443): Max retries exceeded with url: /oauth/token (Caused by SSLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:997)')))
```

You may need to export an environment variable to tell Python where to find your root CA certificate:

```shell
export REQUESTS_CA_BUNDLE=/path/to/your/rootCA.pem
```


## `livestock_report_example.py`

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
    # Leave the next two lines commented out for an interactive username/password prompt
    # username='admin',
    # password='test',
)

# Maintain a nested dictionary of the number of animals first by years age and then by sex
animals_by_years_age_and_sex = defaultdict(lambda: dict(M=0, F=0, NA=0))

# Get the current UTC date for comparing animal birth dates against
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

This next example is a little more involved. It demonstrates using farmOS.py to get all the active
animal assets and print out a plaintext report of the number of animals by age in years and sex.

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

## `harvest_and_archive_last_season_crops.py`

```python
from datetime import datetime, timezone
from farmOS import farmOS

farm_client = farmOS(
    hostname= "https://farm.example.com",
    client_id = "farm",
    scope = "farm_manager",
)

farm_client.authorize(
    # Leave the next two lines commented out for an interactive username/password prompt
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

# Loop over each plant and create a harvest log + update the plant to now be archived
for plant in farm_client.asset.iterate('plant', params=filters):
    print("Harvesting and archiving:", plant['attributes']['name'])

    # Create a harvest log
    farm_client.log.send('harvest', {
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
```

This final example demonstrates both reading and modifying farmOS data using farmOS.py. It
loops over all the plant assets from the previous season (e.g. "2022"), creating a harvest
log for each, then archiving the plant asset.

To run it:

```shell
poetry run python harvest_and_archive_last_season_crops.py
```

Should print something like;

```
Harvesting and archiving: 2022 L12 Radish: 'French Breakfast'
Harvesting and archiving: 2022 L8 Potato: Ozette
Harvesting and archiving: 2022 L8 Potato: Purple Fiesta
Harvesting and archiving: 2022 L12 Beet: Feuer Kugel
Harvesting and archiving: 2022 L13 Cascadia
Harvesting and archiving: 2022 L13 Champion of England
Harvesting and archiving: 2022 L13 Lori's Purple Pea
Harvesting and archiving: 2022 L13 Mammoth Melting
Harvesting and archiving: 2022 L13 Oregon Giant Snow Pea
Harvesting and archiving: 2022 L13 Opal Creek
Harvesting and archiving: 2022 L13 PI 280610 Black Pea
...
```

## Conclusion

Hopefully these examples have been both instructive and inspiring. To learn more, make sure to check out the [farmOS.py documentation](https://farmos.org/development/farmos-py/) along with the [farmOS API documentation](https://farmos.org/development/api/) and the [Drupal JSON:API documentation](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module).
