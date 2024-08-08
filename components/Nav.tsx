import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import Image from "next/image";
// import Logo from "@/images/logo.png";

export default function Nav() {
  return (
    <Navbar>
      <NavbarBrand>
        {/* <Image width={50} alt="Logo" src={Logo} /> */}
      </NavbarBrand>
      <NavbarContent className="flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                분단위 조회
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="분단위 조회"
            className="w-[200px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem>
              <Link className="text-[foreground]" href="/minute-pcs">
                pcs 조회
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link className="text-[foreground]" href="/minute-bat">
                bat 조회
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                초단위 조회
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="초단위 조회"
            className="w-[200px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem>
              <Link className="text-[foreground]" href="/second-pcs">
                pcs 조회
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link className="text-[foreground]" href="/second-bat">
                bat 조회
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarItem>
          <Link color="foreground" href="#">
            통계
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="default" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
