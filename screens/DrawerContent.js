import React, { Component } from 'react'
import { StyleSheet, View, } from 'react-native'
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch, useTheme } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../components/context.js';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

export const DrawerContent = (props) => {
    const { signOut, toggleTheme } = React.useContext(AuthContext);

    const paperTheme = useTheme();

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://cdn.dribbble.com/users/119484/screenshots/2631699/drib.jpg'
                                }}
                                size={50}
                                style={{ borderColor: '#121212', borderWidth: 5, justifyContent: 'center', alignItems: 'center' }}
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Title style={styles.title}>{props.name}</Title>
                                <Caption style={styles.caption}>{props.username}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={styles.paragraph}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={styles.paragraph}>100</Paragraph>
                                <Caption style={styles.caption}>Follower</Caption>
                            </View>

                        </View>

                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => { props.navigation.navigate('Profile') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="bookmark-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Bookmarks"
                            onPress={() => { props.navigation.navigate('Bookmarks') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="settings-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Setting"
                            onPress={() => { props.navigation.navigate('Settings') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-check-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => { props.navigation.navigate('Supports') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preferences}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>

        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: { flex: 1 },
    userInfoSection: { paddingLeft: 20 },
    title: { fontSize: 16, marginTop: 3, fontWeight: 'bold' },
    caption: { fontSize: 14, lineHeight: 14 },
    row: { marginTop: 20, flexDirection: 'row', alignItems: 'center' },
    section: { flexDirection: 'row', alignItems: 'center', marginRight: 15 },
    paragraph: { fontWeight: 'bold', marginRight: 3 },
    drawerSection: { marginTop: 15 },
    bottomDrawerSection: { marginBottom: 15, borderTopColor: '#f4f4f4', borderTopWidth: 1 },
    preferences: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 16 }
})