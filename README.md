# square-parts
Solution for the [Exercise 2 - HTTP API for car parts](https://github.com/timotr/harjutused/blob/main/hajusrakendused/spareparts.md) written in Javascript using Express

## Usage

Going to ```/parts``` to return all the parts. The results are paginated and there are 30 parts by each page.
To change the page, simply add the ```?page``` parameter to the url.

Going to the ```/parts/:serial number``` in order to return a specific part by its serial number.
