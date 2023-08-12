import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader'

const Ceremony = ({ cardDiv, buttons, text }) => {
  const locationURL = 'https://www.google.com/maps?ll=-25.279004,-57.58289&z=16&t=m&hl=en-US&gl=US&mapclient=apiv3&cid=17998339525865837309'

  let map;

  async function initMap() {

    const position = { lat: -25.280473758191203, lng: -57.583168949872 };

    const { Map, InfoWindow } = await google.maps.importLibrary('maps');
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

    map = new Map(document.getElementById('map'), {
      zoom: 16,
      center: position,
      mapId: 'DEMO_MAP_ID',
    });

    const infoWindow = new InfoWindow();

    const marker = new AdvancedMarkerElement({
      map: map,
      position: position,
      title: 'Church',
    });

    marker.addListener('click', ({ domEvent, latLng }) => {
      const { target } = domEvent;

      infoWindow.close();
      infoWindow.setContent(marker.title);
      infoWindow.open(marker.map, marker);
    });
  }

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.API_KEY,
      version: 'weekly',
    });

    loader.load().then(initMap);
  }, []);

  return (
    <div className={`themeFont ${cardDiv}`}>
      <h1 className='themeFontM'>{text.heading}</h1>
      <div>
        <div className='h-full w-full flex flex-row max-md:flex-col flex-nowrap max-md:flex-wrap justify-evenly content-evenly'>
          <img src='./assets/churchicon.svg' className='w-[35vw] max-md:w-[33vw] max-md:self-center'/>
          <br/>
          <div className='self-center'>
            <p>{text.where}</p>
            <a href={locationURL} target='_blank'>
              <button className={buttons}>{text.locationButton}</button>
            </a>
            <br/>
            <br/>
            <p>{text.when}</p>
            <a href={text.calendarLink} target='_blank'>
              <button className={buttons}>{text.calendarButton}</button>
            </a>
          </div>
        </div>
        <br/>
        <div id='map'/>
      </div>
    </div>
  )
}

export default Ceremony;