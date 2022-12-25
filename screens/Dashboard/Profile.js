import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import {
  IconButton,
  TextButton,
  LineDivider,
  ProgressBar,
  ProfileValue,
} from "../../components";

import { SIZES, COLORS, FONTS, icons, images } from "../../constants";

const Profile = () => {
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 50,
          paddingHorizontal: SIZES.padding,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ ...FONTS.h1, fontWeight: "600" }}>Profile</Text>

        <IconButton
          icon={icons.sun}
          iconStyle={{
            tintColor: COLORS.black,
          }}
        />
      </View>
    );
  }

  function renderProfileCard() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary3,
        }}
      >
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
          }}
        >
          <Image
            source={images.profile}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 40,
              borderWidth: 1,
              borderColor: COLORS.white,
            }}
          />
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                marginBottom: -15,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                backgroundColor: COLORS.primary,
              }}
            >
              <Image
                source={icons.camera}
                resizeMode="contain"
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            alignItems: "flex-start",
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h2, fontWeight: "600" }}>
            Carlos Ziegler
          </Text>

          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body4,
            }}
          >
            Front - End Developer
          </Text>

          <ProgressBar
            progress="60%"
            containerStyle={{
              marginTop: SIZES.radius,
            }}
          />

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                flex: 1,
                color: COLORS.white,
                ...FONTS.body4,
              }}
            >
              Overall Progress
            </Text>

            <Text style={{ color: COLORS.white, ...FONTS.body4 }}>60%</Text>
          </View>

          <TextButton
            label="+ Become Member"
            contentContainerStyle={{
              height: 35,
              marginTop: SIZES.padding,
              paddingHorizontal: SIZES.radius,
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}
            labelStyle={{
              color: COLORS.primary,
            }}
          />
        </View>
      </View>
    );
  }

  function renderProfileSection1() {
    return (
      <View style={styles.profileSectionContainer}>
        <ProfileValue
          icon={icons.profile}
          label="Name"
          value="Carlos Ziegler"
        />

        <LineDivider />

        <ProfileValue
          icon={icons.email}
          label="Email"
          value="chziegler@gmail.com"
        />

        <LineDivider />

        <ProfileValue
          icon={icons.password}
          label="Password"
          value="Updated 2 weeks ago"
        />

        <LineDivider />

        <ProfileValue
          icon={icons.call}
          label="Contact"
          value="+55 61 98492-4818"
        />
      </View>
    );
  }

  function renderProfileSection2() {
    return (
      <View style={styles.profileSectionContainer}>
        <ProfileValue icon={icons.star_1} value="Pages" />

        <LineDivider />

        <ProfileValue
          icon={icons.notification}
          value="Notifications"
          notification={true}
        />

        <LineDivider />

        <ProfileValue
          icon={icons.reminder}
          value="Study Remember"
          notification={true}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderHeader()}

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 120,
        }}
      >
        {renderProfileCard()}

        {renderProfileSection1()}

        {renderProfileSection2()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray20,
  },
});

export default Profile;
