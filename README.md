# Arroyo

## Preparation
See [here](https://github.com/Team-Arroyo/arroyo-deployment) for first time setup

## Usage

### To Start

#### To start Arroyo for the first time
```markdown
docker compose-up
```

#### To restart Arroyo
```markdown
docker compose start
```
### To Open the Browser Based User Interface
Navigate to 
```markdown
 http://localhost:3000
```
in your browser.

### Bulk Re-ingest
---
![ByDate Tab](https://github.com/Team-Arroyo/Internal_Documentation/blob/main/byDatebyDate.jpg)

1. Enter a start date and an end date. The start date must be equal to or before the end date.
2. Click on `Select Log Files`. If no files were found in the selected date range, you will be prompted to widen your search.

![ByDate Select](https://github.com/Team-Arroyo/Internal_Documentation/blob/main/byDateSelect.jpg)

3. Select the files you want to re-ingest. To select all files for re-ingestion, click `Select All Log Files`. To clear all selected files, click `Clear All Selected Files`
4. Click `Ingest Selected Files`. You will recieve a prompt when the request for re-ingestion is recieved. 

### Query Re-ingest
---
![BySearch Overview](https://github.com/Team-Arroyo/Internal_Documentation/blob/main/bySearchOverview.jpg)
1. Enter a start date and an end date. The start date must be equal to or before the end date.
2. Enter a log attribute (for example, request_method) and the attribute value (for example, GET) and click the `+` button. You will see the attribute and value pair appear.

![BySearch with Terms](https://github.com/Team-Arroyo/Internal_Documentation/blob/main/bySearchWithPill.jpg)

To remove an attribute: value pair, click `x` on the pill. To update an attribute: value pair, type the log attribute in with the updated value at click the `+` button. You will see the attribute: value pair update. You can only have two attribute: value pairs.

3. Click `Ingest Matching Log Enteries`. You will recieve a prompt when the request for re-ingestion is recieved.
### To Stop
```markdown
docker compose stop
```
