import React from "react";
import { Link, useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRecoilState } from "recoil";
import { isLoginStatState, userProfileImgState } from "../store.js";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.js";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

import SignupModal from "./modals/SignupModal.jsx";
import LoginModal from "./modals/LoginModal.jsx";
import ThemeToggleButton from "./ThemeToggleButton.jsx";

function Header() {
  const [isLoginStat, setIsLoginStat] = useRecoilState(isLoginStatState);
  const [userProfileImg, setUserProfileImg] =
    useRecoilState(userProfileImgState);

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

  const onSignOut = async () => {
    try {
      await signOut(auth);
      return toast.success("로그아웃 되었습니다.");
    } catch (error) {
      return toast.error(error.code);
    }
  };

  return (
    <div className="mb-10">
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
          {isLoginStat ? (
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  src={userProfileImg}
                  className="hover:scale-[0.9] hover:cursor-pointer"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="profile">
                  <Link to="/Profile" className="block h-full w-full">
                    프로필 관리
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className="text-danger"
                  color="danger"
                  onPress={onSignOut}
                >
                  로그아웃
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <NavbarItem>
                <Button
                  color="primary"
                  variant="ghost"
                  size="md"
                  onPress={onLogin}
                >
                  로그인
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  color="danger"
                  variant="light"
                  size="md"
                  onPress={onSign}
                >
                  회원가입
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </div>
  );
}

export default Header;
