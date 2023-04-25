import axios from "axios";
import { config } from "./apikey.js";
// import fs from "fs";

// //파일 읽어오기(api키 숨기기 위해)
// const fileName: string = "/./apikey.js";
// let fileContent = fs.readFileSync(fileName);
// console.log(fileContent);

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

//google 변수에 대한 타입 any로 선언
// declare let google: any;
//npm install --save-dev @types/googlemaps로 구글 맵스 타입 설정 가능

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};
function searchAddressHandler(event: Event) {
  event.preventDefault();
  //문자인 주소 입력값을 호환되게 변환하기 encodeURI()
  const enteredAddress = addressInput.value;

  //응답타입 추가하기 <{ results: { geometry: { location: { lat: number; lng: number } } }[]; }>
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${config.apikey}`
    )

    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }

      console.log(response);
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 16,
      });

      //marker추가하기
      new google.maps.Marker({
        map: map,
        position: coordinates,
        title: "Uluru",
      });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
