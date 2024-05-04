import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { TagCloud } from "@frank-mayer/react-tag-cloud";

import { FaInstagram } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { PiTelegramLogo } from "react-icons/pi";

//Todo : 이쁘게 디자인하기

function Home() {
  return (
    <>
      <div className="flex justify-center">
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="src/assets/homeCardImg.jpg"              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">홍연우</p>
              <p className="text-small text-default-500">2005 12/22 | ENTP</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-col gap-[30px]">
              <p className="break-keep">
                안녕하세요 저는 풀스택 개발자를 꿈꾸는 프론트 개발자 홍연우
                입니다. 토스 가보자 .
              </p>

              <div className="my-3.5 flex gap-2">
                <Link
                  isExternal
                  color="foreground"
                  className="text-[28px] hover:cursor-pointer hover:text-primary"
                  href="https://github.com/Just0neMoment"
                >
                  <FiGithub />
                </Link>

                <Link
                  isExternal
                  color="foreground"
                  className="text-[28px] hover:cursor-pointer hover:text-primary"
                  href="https://www.instagram.com/want_kurzweil/"
                >
                  <FaInstagram />
                </Link>

                <Link
                  isExternal
                  color="foreground"
                  className="text-[28px] hover:cursor-pointer hover:text-primary"
                  href="https://t.me/justOneM0ment"
                >
                  <PiTelegramLogo />
                </Link>
              </div>

              <div>
                <h2 className="text-lg font-bold">Stack 💎</h2>
                <div className="flex flex-wrap gap-1.5">
                  <Image
                    alt="HTML5"
                    radius="sm"
                    src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"
                  />
                  <Image
                    alt="CSS3"
                    radius="sm"
                    src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"
                  />
                  <Image
                    alt="TailwindCss"
                    radius="sm"
                    src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"
                  />
                  <Image
                    alt="Javascript"
                    radius="sm"
                    src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"
                  />
                  <Image
                    alt="AutoHotKey"
                    radius="sm"
                    src="https://img.shields.io/badge/autohotkey-00ff00?style=for-the-badge&logo=autohotkey&logoColor=white"
                  />
                  <Image
                    alt="React"
                    radius="sm"
                    src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
                  />
                  <Image
                    alt="Recoil"
                    radius="sm"
                    src="https://camo.githubusercontent.com/ae2a7215898a45a41d33b8151b11558ff897782986352a47d6b42b35089593f5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5265636f696c2d2532333030303030302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265636f696c266c6f676f436f6c6f723d7768697465"
                  />
                  <Image
                    alt="Redux"
                    radius="sm"
                    src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"
                  />
                  <Image
                    alt="Firebase"
                    radius="sm"
                    src="https://camo.githubusercontent.com/253f4842177fe68f329fc1713537477b92aca3f29edf52b1dbced68ae3262eed/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f66697265626173652d2532333033394245352e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6669726562617365"
                  />
                  <Image
                    alt="Figma"
                    radius="sm"
                    src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white"
                  />
                  <Image
                    alt="Vultr"
                    radius="sm"
                    src="https://img.shields.io/badge/Vultr-007BFC.svg?style=for-the-badge&logo=vultr"
                  />
                </div>
              </div>
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/Just0neMoment/blog"
            >
              This site is open source.
            </Link>
          </CardFooter>
        </Card>
        <TagCloud
          options={(w) => ({
            radius: Math.min(500, w.innerWidth, w.innerHeight) / 2,
            maxSpeed: "fast",
          })}
        >
          {[
            "HTML5",
            "CSS3",
            "TailwindCSS",
            "JavaScript",
            "AutoHotKey",
            "React",
            "Redux",
            "Recoil",
            "Firebase",
            "Figma",
            "Vultr",
            "IIS",
          ]}
        </TagCloud>
      </div>
    </>
  );
}

export default Home;
