import { Button } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import ban1 from "@/components/img/banner.png"
import ban2 from "@/components/img/ban2.jpeg"
import ban3 from "@/components/img/ban3.jpg"
import Image from "next/image";

export default function Slider() {
  return (
    <div className="w-screen overflow-hidden">
      <Carousel className="w-full h-full">
        <Carousel.Item>
          <Image
            className=" object-fill w-100 h-96"
            src={ban1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className=" object-fill w-100 h-96"
            src={ban2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className=" object-fill w-100 h-96"
            src={ban3}
            alt="Third slide"
          />
      
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
