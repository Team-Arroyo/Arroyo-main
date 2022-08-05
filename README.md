### Preparation
See [here](https://github.com/Team-Arroyo/arroyo-deployment) for first time setup.

### To Start Arroyo

#### Start with new Docker Container
```markdown
docker compose-up
```

#### Restart from Existing Docker Container
```markdown
docker compose start
```
### Open the Browser Based User Interface
```markdown
 http://localhost:3000
```
Enter the above URL in your browser.

### Bulk Re-ingest
---
![ByDate Tab](https://github.com/Team-Arroyo/Internal_Documentation/blob/main/byDatebyDate.jpg)

1. Enter a start date and an end date. The start date must be before or the same as the end date.
2. Click on `Select Log Files`. If no files were found in the selected date range, you will be prompted to widen your search.

![ByDate Select](https://github.com/Team-Arroyo/Internal_Documentation/blob/main/byDateSelect.jpg)

3. Select the files you want to re-ingest.
4. Click `Ingest Selected Files` to submit the re-ingestion request. You will recieve a prompt when the request is recieved. 

### Query Re-ingest
---
![BySearch Overview](https://github.com/Team-Arroyo/Internal_Documentation/blob/main/bySearchOverview.jpg)
1. Enter a start date and an end date. The start be before or the same as the end date.
2. Enter a log attribute (for example, request_method) and the log attribute value (for example, GET) and click the `+` button. You will see your entry appear.

![BySearch with Terms](https://github.com/Team-Arroyo/Internal_Documentation/blob/main/bySearchWithPill.jpg)

Click `x` on the pill to remove an entry.
If you wish to update an existing entry, enter the log attribute and the updated log attribute value, then click the `+` button. 
You can have one or two enteries. 
3. Click `Ingest Matching Log Enteries`. You will recieve a prompt when the request for re-ingestion is recieved.
### To Stop
```markdown
docker compose stop
```
