# <center>**Wardrobify**

<center>

# **Team**
---
**Kramer Smith** -- Shoes API
**Jake Tippit** -- Hats API
---

</center>


<br><br>


# <center>**Diagram of Architecture**

---

<br>

<p align="center">
</p>
<br><br><br>

# <center>**Shoe Microservice**
---

<br><br>

## **Models**

---
### **Shoe Model** -- (used to create a shoe)

>When creating a shoe, the following properties are required: The model, the manufacturer, the color, and a foreignkey for which bin the shoe is located within

| **MODEL FIELD**  | **FIELD TYPE** | **OTHER ARGS**                             |
| :-------------:  | :------------: | :----------------------------------------- |
|     "model"      |  `CharField`   | `max_length: 100 (required)`               |
|  "manufacturer"  |  `CharField`   | `max_length: 100 (required)`               |
|     "color"      |  `CharField`   | `max_length: 100 (required)`               |
|     "bin"        |  `Foreignkey`  | `Bin`<br>`on_delete=models.CASCADE`        |

<br><br>

### **BinVO Model** -- (used to create a bin)

>This model is a value object used for polling the bin api. We have made it so every five seconds the poller sends their bin data to the shoe microservice. The shoe microservice then uses this data to determine what bin the shoe belongs to.

| **MODEL FIELD** |       **FIELD TYPE**        | **OTHER ARGS**               |
| :-------------: | :-------------------------: | :--------------------------- |
|  "closet_name"  |         `CharField`         | `max_length: 100 (required)` |
|  "import_href"  |         `CharField`         | `max_length: 200 (required)` |

<br><br>

## **API Views**

---
<br>

### ***Shoes :**

| **REQUEST METHOD** |                     **FUNCTION**                      |                     **ENDPOINT**                     |
| :----------------: | :---------------------------------------------------: | :--------------------------------------------------: |
|       `GET`        |                   list shoes                          |       http://localhost:8080/api/shoes/               |
|       `GET`        |                   list shoes of bin                   |       http://localhost:8080/api/bins/:id/shoes/      |
|       `POST`       |                  create shoe                          |       http://localhost:8080/api/shoes/               |
|      `DELETE`      |                  delete shoe                          |     http://localhost:8080/api/shoes/:id/             |

<br>

# <center>**Hats Microservice**
---

## **Models**

---

### **Hat Model** -- (used to create a shoe)

>When creating a hat, the following properties are required: The style, the fabric, the color, and a foreignkey for which location the hat is located within

| **MODEL FIELD**  | **FIELD TYPE** | **OTHER ARGS**                             |
| :-------------:  | :------------: | :----------------------------------------- |
|     "style"      |  `CharField`   | `max_length: 100 (required)`               |
|     "fabric"     |  `CharField`   | `max_length: 100 (required)`               |
|     "color"      |  `CharField`   | `max_length: 100 (required)`               |
|     "location"   |  `Foreignkey`  | `Location`<br>`on_delete=models.CASCADE`   |

<br><br>

### **LocationVO Model** -- (used to create a location)

>This model is a value object used for polling the location api. We have made it so every five seconds the poller sends their location data to the hat microservice. The hat microservice then uses this data to determine what location the shat belongs to.

| **MODEL FIELD** |       **FIELD TYPE**        | **OTHER ARGS**               |
| :-------------: | :-------------------------: | :--------------------------- |
|  "closet_name"  |         `CharField`         | `max_length: 100 (required)` |
|  "import_href"  |         `CharField`         | `max_length: 200 (required)` |

<br><br>

## **API Views**

---
<br>

### ***Hats :**

| **REQUEST METHOD** |                     **FUNCTION**                      |                     **ENDPOINT**                     |
| :----------------: | :---------------------------------------------------: | :--------------------------------------------------: |
|       `GET`        |                   list hats                           |       http://localhost:8090/api/hats/                |
|       `GET`        |                   list hats of location               |       http://localhost:8090/api/locations/:id/hats/  |
|       `POST`       |                  create hat                           |       http://localhost:8090/api/hats/                |
|      `DELETE`      |                  delete hat                           |       http://localhost:8090/api/hats/:id/            |

<br>

# <center>**Key React Features**
---

### **Warning message beofre deleting a shoe/hat**

> Before deleting a shoe or hat you will be given a warning message informing you that you are about to delete a shoe/hat where you then must confirm that you want to delete the item 

### **Success message after deleting a shoe/hat**

> After deleting a shoe or hat you will be given a success message informing you that you have successfully deleted the shoe/hat

### **A form for creating new bins and locations**

> These forms allow the user to create a new bin or location to store their shoes or hats in respectively

### **List of shoes**

> This list displays all of the shoes that the user owns as well as the bin they are in. The cards the shoes are displayed on act as a hyperlink that will take you to the detail page of that specific shoe. 

### **List of hats**

> This list displays all of the hats that the user owns as well as the location they are in. The cards the hats are displayed on act as a hyperlink that will take you to the detail page of that specific hat.

<br>

# **Getting the app started**
---

1. Git clone into your local repository
    `git clone <<repo>>`
2. Change your active directory to that of the app you just cloned
    `cd microservice-two-shot`
3. Create a volume and name it pgdata
    `docker volume create pgdata`
4. Build the image`
    `docker compose buile`
5. Run the containers
    `docker compose up`
6. Open browser to http://localhost:3000/ to make sure it's running
7. Once it's up and running, you can begin using the service and inputting data

## Inputting data through Insomnia using the POST method
---

### **Add a Bin**

```json
		{
			"closet_name": "Master closet"
            "bin_number": 1
            "bin_size": 25
		}
```

### **Add a Location**

```json
		{
			"closet_name": "Master closet"
            "section_number": 2
            "shelf_number": 5
		}
```

### **Add a shoe**

```json
	    {
	        "manufacturer": "Adidas",
	        "model": "Tenishoes",
	        "color": "green",
	        "picture_url": "google.com",
	        "bin": 1
        }
```

### **Add a hat**

```json
	    {
	        "fabric": "Denim",
	        "style": "Buckethat",
	        "color": "Green",
	        "picture_url": "https: //m.media-amazon.com/images/I/81FILNzY-wL._AC_UL1500_.jpg",
	        "location": 1
        }
```
