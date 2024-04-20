import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from "@nextui-org/react";

import SignupModal from "./modals/SignupModal.jsx";
import LoginModal from "./modals/LoginModal.jsx";
import ThemeToggleButton from "./ThemeToggleButton.jsx";

// Todo : Link안에 삼항연산자 줄일 수 있다다면 줄이기

function Header() {
  useEffect(() => {
    let Theme = localStorage.getItem("Theme");
    document.querySelector("html").classList.add(Theme);
  }, []);

  const location = useLocation();

  const {
    isOpen: isLogin,
    onOpen: onLogin,
    onOpenChange: changeLogin,
  } = useDisclosure();

  const {
    isOpen: isSign,
    onOpen: onSign,
    onOpenChange: changeSign,
  } = useDisclosure();

  return (
    <>
      <LoginModal
        onLogin={onLogin}
        isLogin={isLogin}
        changeLogin={changeLogin}
      />
      <SignupModal onSign={onSign} isSign={isSign} changeSign={changeSign} />
      <Navbar isBordered>
        <NavbarBrand>
          <Link to="/" className="text-2xl font-bold text-primary">
            Yeon's Blog
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarItem>
            <Link
              to="/"
              className={`px-2 py-3 ${location.pathname === "/" ? "text-primary" : null} hover:text-primary`}
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              to="/Post"
              className={`px-2 py-3 ${location.pathname === "/Post" ? "text-primary" : null} hover:text-primary`}
            >
              Post
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className={`px-2 py-3 ${location.pathname === "/AboutMe" ? "text-primary" : null} hover:text-primary`}
            >
              About Me
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className={`px-2 py-3 ${location.pathname === "/Contact" ? "text-primary" : null} hover:text-primary`}
            >
              Contact
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeToggleButton />
          </NavbarItem>
          <NavbarItem>
            <Button color="primary" variant="ghost" size="md" onPress={onLogin}>
              로그인
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button color="danger" variant="light" size="md" onPress={onSign}>
              회원가입
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}

export default Header;
