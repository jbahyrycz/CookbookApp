import {Outlet} from "react-router-dom";
import {AppNavbar} from "./AppNavbar";
import {AppShell, Burger, Group} from "@mantine/core";
import React from "react";
import {useDisclosure} from "@mantine/hooks";

export const Layout = () => {
    const [opened, {toggle}] = useDisclosure()
    return (
        <AppShell
            header={{height: 60}}
            navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: !opened}}}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
                    CookBook
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <AppNavbar/>
            </AppShell.Navbar>
            <AppShell.Main><Outlet/></AppShell.Main>
        </AppShell>
    )
}