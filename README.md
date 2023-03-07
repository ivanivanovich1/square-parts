# square-parts
Solution for the [Exercise 2 - HTTP API for car parts](https://github.com/timotr/harjutused/blob/main/hajusrakendused/spareparts.md) written in Javascript using Express

## Usage

### Pagination

Going to ```/square-parts``` to return all the parts. The results are paginated and there are 30 parts by each page.
To change the page, simply add the ```?page``` parameter to the url.

```
http://localhost:3005/square-parts?page=3
```

### Finding a part by its serial number

In order to find a part by its serial number, you should add the ```serial``` parameter to the url, and provide the serial number of a part.

```
http://localhost:3005/square-parts?serial=01297380935
```

### Finding a part by its name

In order to find a part by its name, you should add the ```name``` parameter to the url, and provide the name of a part.

```
http://localhost:3005/square-parts?name=Set of templates, doors, rear
```

### Finding a part by its name and serial

You can also combine the ```serial``` and ```name``` params in order to find a part by both its serial number and name.

```
http://localhost:3005/square-parts?name=Set of templates, doors, rear&serial=01297380935
```
