var Slider = {};

Slider.htmlPageNumber = document.getElementById("slider-page-number");
Slider.htmlButtonLeft = document.getElementById("slider-button-left");
Slider.htmlButtonRight = document.getElementById("slider-button-right");
Slider.pictures = Array();
Slider.canvas = document.getElementById("slider-canvas");
Slider.ctx = Slider.canvas.getContext("2d");
Slider.picturesProcessing = 0;
Slider.page = 0;
Slider.perPage = 3;
Slider.maxPage = 0;
Slider.maxPageServer = 1000000000000;
Slider.loading = false;
Slider.url = "http://localhost:3000/api/pictures?from=" + Slider.page*Slider.perPage +"&to=" + (Slider.page+1)*Slider.perPage;
Slider.xhttp = new XMLHttpRequest();
Slider.xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
  	let json = JSON.parse(this.responseText);
    Slider.maxPage = Slider.page;
  	for (let i = 0, n = json.length; i < n; i++) {
  		if (i == 0 && json[i]['data'] == undefined) {
  			Slider.page--;
        Slider.htmlPageNumber = Slider.page;
        Slider.maxPageServer = Slider.page;
        break;
  		} else if (json[i]['data'] == undefined) {
        Slider.maxPageServer = Slider.page;
        break;
      }
      Slider.picturesProcessing++;
  		Slider.processImage(json[i]['data']);
  	}
  }
};
Slider.xhttp.open("GET", Slider.url, true);
Slider.xhttp.send();

Slider.drawImages = function() {
	let i = Slider.page*Slider.perPage, n = (Slider.page+1)*Slider.perPage;
	let amount = n > Slider.pictures.length ? Slider.pictures.length - i : n - i;
	let widthPerPicture = Slider.canvas.width / amount; 
	for (let j = 0; i < n; i++, j++) {
    if (i < Slider.pictures.length) {
		  Slider.ctx.drawImage(Slider.pictures[i], widthPerPicture*j, 0, widthPerPicture, Slider.canvas.height);
    }
	}
}

Slider.rightButtonClicked = function() {
  if (Slider.loading) return;
	Slider.page++;
  if (Slider.page > Slider.maxPageServer) {
    Slider.page--;
    return;
  } else if (Slider.page > Slider.maxPage) {
		Slider.url = "http://localhost:3000/slike";
		Slider.xhttp.open("GET", Slider.url, true);
		Slider.xhttp.send();
    Slider.loading = true;
    Slider.htmlPageNumber.innerHTML = Slider.page+1;
	} else if (Slider.page <= Slider.maxPage) {
    Slider.htmlPageNumber.innerHTML = Slider.page+1;
    Slider.drawImages();
  }
}

Slider.leftButtonClicked = function() {
  if (Slider.loading) return;
  if (Slider.page - 1 >= 0) {
    Slider.page--;
    Slider.drawImages();
    Slider.htmlPageNumber.innerHTML = Slider.page+1;
  }
}

Slider.processImage = function(buffer) {
	let uInt8Array = buffer;
  let i = uInt8Array.length;
  let binaryString = [i];
  while (i--) {
    binaryString[i] = String.fromCharCode(uInt8Array[i]);
  }
  let data = binaryString.join('');
  let base64 = window.btoa(data);
  let img = new Image();
  img.src = "data:image/png;base64," + base64;
  img.onload = function () {
    console.log("Image Onload");
    Slider.pictures.push(img);
    Slider.picturesProcessing--;
    if (Slider.picturesProcessing == 0) {
    	Slider.drawImages();
      Slider.loading = false;
    }
  };
  img.onerror = function (stuff) {
    console.log("Img Onerror:", stuff);
  };
}

Slider.htmlButtonLeft.addEventListener("click", Slider.leftButtonClicked);
Slider.htmlButtonRight.addEventListener("click", Slider.rightButtonClicked);