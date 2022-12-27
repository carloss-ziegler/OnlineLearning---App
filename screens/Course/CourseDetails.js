import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Keyboard,
  Image,
} from "react-native";
import { Video } from "expo-av";

import { IconButton, LineDivider } from "../../components";
import { COLORS, FONTS, SIZES, constants, icons } from "../../constants";
import { StatusBar } from "expo-status-bar";
import CourseChapters from "./CourseTabs/CourseChapters";
import CourseFiles from "./CourseTabs/CourseFiles";
import CourseDiscussions from "./CourseTabs/CourseDiscussions";

const course_details_tabs = constants.course_details_tabs.map(
  (course_details_tab) => ({
    ...course_details_tab,
    ref: React.createRef(),
  })
);

const TabIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = course_details_tabs.map((_, i) => i * SIZES.width);

  const tabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 0,
        height: 4,
        width: tabIndicatorWidth,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({ scrollX, onTabPress }) => {
  const [measureLayout, setMeasureLayout] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    let ml = [];

    course_details_tabs.forEach((course_details_tab) => {
      course_details_tab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({
            x,
            y,
            width,
            height,
          });

          if (ml.length === course_details_tabs.length) {
            setMeasureLayout(ml);
          }
        }
      );
    });
  }, [containerRef.current]);

  return (
    <View
      ref={containerRef}
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {course_details_tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            ref={item.ref}
            style={{
              flex: 1,
              paddingHorizontal: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              Keyboard.dismiss();
              onTabPress(index);
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                fontWeight: "500",
                fontSize: SIZES.height > 800 ? 18 : 17,
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const CourseDetails = ({ route, navigation }) => {
  const { selectedCourse } = route.params;

  const videoRef = useRef();
  const flatListRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;

  const [playVideo, setPlayVideo] = useState(false);
  const [status, setStatus] = useState({});

  const onTabPress = useCallback((tabIndex) => {
    flatListRef?.current?.scrollToOffset({
      offset: tabIndex * SIZES.width,
    });
  });

  function renderHeaderComponents() {
    return (
      <>
        <View
          style={{
            flex: 1,
          }}
        >
          <IconButton
            icon={icons.back}
            iconStyle={{
              width: 25,
              height: 25,
              tintColor: COLORS.black,
            }}
            containerStyle={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}
            onPress={() => navigation.goBack()}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <IconButton
            icon={icons.media}
            iconStyle={{
              tintColor: COLORS.white,
            }}
            containerStyle={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          />

          <IconButton
            icon={icons.favourite_outline}
            iconStyle={{
              tintColor: COLORS.white,
            }}
            containerStyle={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
      </>
    );
  }

  function renderHeader() {
    if (playVideo) {
      return (
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.radius * 1.5,
            paddingBottom: SIZES.base,
            paddingTop: 10,
            height: 85,
            backgroundColor: COLORS.black,
            alignItems: "center",
          }}
        >
          {renderHeaderComponents()}
        </View>
      );
    } else {
      return (
        <View
          style={{
            position: "absolute",
            top: SIZES.height > 800 ? 40 : 25,
            left: 0,
            right: 0,
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            zIndex: 1,
          }}
        >
          {renderHeaderComponents()}
        </View>
      );
    }
  }

  function renderVideoSection() {
    return (
      <View
        style={{
          height: SIZES.height > 800 ? 220 : 200,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.gray80,
        }}
      >
        <ImageBackground
          source={selectedCourse?.thumbnail}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            icon={icons.play}
            iconStyle={{
              width: 25,
              height: 25,
              tintColor: COLORS.white,
            }}
            containerStyle={{
              width: 55,
              height: 55,
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.padding,
              borderRadius: 30,
              backgroundColor: COLORS.primary,
            }}
            onPress={() => setPlayVideo(true)}
          />
        </ImageBackground>

        {playVideo && (
          <Video
            ref={videoRef}
            source={{
              uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            useNativeControls
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: COLORS.black,
            }}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        )}
      </View>
    );
  }

  function renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}>
          <Tabs scrollX={scrollX} onTabPress={onTabPress} />
        </View>

        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.gray20,
          }}
        />

        <Animated.FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          decelerationRate="fast"
          keyboardDismissMode="on-drag"
          showsHorizontalScrollIndicator={false}
          data={constants.course_details_tabs}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          renderItem={({ item, index }) => {
            return (
              <View style={{ width: SIZES.width }}>
                {index == 0 && <CourseChapters />}
                {index == 1 && <CourseFiles />}
                {index == 2 && <CourseDiscussions />}
              </View>
            );
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar style="light" />
      {renderHeader()}

      {renderVideoSection()}

      {renderContent()}
    </View>
  );
};

export default CourseDetails;
