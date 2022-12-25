import React from "react";
import { View, Text, ScrollView, ImageBackground, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import {
  SIZES,
  COLORS,
  FONTS,
  icons,
  images,
  dummyData,
} from "../../constants";
import {
  CategoryCard,
  HorizontalCourseCard,
  IconButton,
  LineDivider,
  TextButton,
  VerticalCourseCard,
} from "../../components";
import { StatusBar } from "expo-status-bar";

const Section = ({ containerStyle, title, onPress, children }) => {
  return (
    <View style={{ ...containerStyle }}>
      <View style={{ flexDirection: "row", paddingHorizontal: SIZES.padding }}>
        <Text style={{ flex: 1, ...FONTS.h2, fontWeight: "600" }}>{title}</Text>

        <TextButton
          contentContainerStyle={{
            width: 80,
            borderRadius: 30,
            backgroundColor: COLORS.primary,
          }}
          label="See All"
          onPress={onPress}
        />
      </View>

      {children}
    </View>
  );
};

const Home = () => {
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
          marginBottom: 10,
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ ...FONTS.h2, fontWeight: "600" }}>
            Hello, <Text style={{}}>Carlos Henrique</Text>!
          </Text>
          <Text style={{ color: COLORS.gray50, ...FONTS.body3 }}>
            Sábado, 24th Dec 2022
          </Text>
        </View>

        <IconButton
          icon={icons.notification}
          iconStyle={{
            tintColor: COLORS.black,
          }}
        />
      </View>
    );
  }

  function renderStartLearning() {
    return (
      <ImageBackground
        source={images.featured_bg_image}
        style={{
          alignItems: "flex-start",
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 15,
        }}
        imageStyle={{ borderRadius: SIZES.radius }}
      >
        <View>
          <Text style={{ color: COLORS.white, ...FONTS.body2 }}>HOW TO</Text>
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
            Make your brand more visible with our checklist
          </Text>
          <Text
            style={{
              marginTop: SIZES.radius,
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            By Carlos Ziegler
          </Text>
        </View>

        <Image
          source={images.start_learning}
          style={{ width: "100%", height: 110, marginTop: SIZES.padding }}
        />

        <TextButton
          label="Start Learning"
          contentContainerStyle={{
            height: 40,
            paddingHorizontal: SIZES.padding,
            borderRadius: 20,
            backgroundColor: COLORS.white,
          }}
          labelStyle={{
            color: COLORS.black,
            fontWeight: "600",
          }}
        />
      </ImageBackground>
    );
  }

  function renderCourses() {
    return (
      <FlatList
        horizontal
        data={dummyData.courses_list_1}
        listKey="Courses"
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: SIZES.padding }}
        renderItem={({ item, index }) => {
          return (
            <VerticalCourseCard
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                padding: SIZES.radius,
                marginRight:
                  index == dummyData.courses_list_1.length - 1
                    ? SIZES.padding
                    : 0,
              }}
              course={item}
            />
          );
        }}
      />
    );
  }

  function renderCategories() {
    return (
      <Section title="Categories">
        <FlatList
          horizontal
          data={dummyData.categories}
          listKey="Categories"
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({ item, index }) => (
            <CategoryCard
              category={item}
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : SIZES.base,
                marginRight:
                  index == dummyData.categories.length - 1 ? SIZES.padding : 0,
              }}
            />
          )}
        />
      </Section>
    );
  }

  function renderPopularCourses() {
    return (
      <Section title="Popular Courses" containerStyle={{ marginTop: 30 }}>
        <FlatList
          data={dummyData.courses_list_2}
          listKey="PopularCourses"
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.padding,
          }}
          renderItem={({ item, index }) => (
            <HorizontalCourseCard
              course={item}
              containerStyle={{
                marginVertical: SIZES.padding,
                marginTop: index == 0 ? SIZES.radius : SIZES.padding,
              }}
            />
          )}
          ItemSeparatorComponent={() => (
            <LineDivider
              lineStyle={{
                backgroundColor: COLORS.gray20,
              }}
            />
          )}
        />
      </Section>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar style="dark" />
      {renderHeader()}

      <ScrollView
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        {renderStartLearning()}

        {renderCourses()}

        <LineDivider lineStyle={{ marginVertical: SIZES.padding }} />

        {renderCategories()}

        {renderPopularCourses()}
      </ScrollView>
    </View>
  );
};

export default Home;
