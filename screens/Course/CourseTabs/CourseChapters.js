import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  COLORS,
  FONTS,
  SIZES,
  dummyData,
  icons,
  images,
} from "../../../constants";
import {
  HorizontalCourseCard,
  IconLabel,
  LineDivider,
  TextButton,
} from "../../../components";

const CourseChapters = () => {
  function renderHeader() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Text
          style={{
            ...FONTS.h2,
            fontWeight: "600",
          }}
        >
          {dummyData?.course_details.title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.base,
          }}
        >
          <Text
            style={{
              color: COLORS.gray30,
              ...FONTS.body4,
            }}
          >
            {dummyData?.course_details.number_of_students}
          </Text>

          <IconLabel
            icon={icons.time}
            label={dummyData?.course_details.duration}
            containerStyle={{
              marginLeft: SIZES.radius,
            }}
            iconStyle={{
              width: 15,
              height: 15,
            }}
            labelStyle={{
              ...FONTS.body4,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            alignItems: "center",
          }}
        >
          <Image
            source={images.profile}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
            }}
          />

          <View
            style={{
              flex: 1,
              marginLeft: SIZES.base,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                fontWeight: "500",
                fontSize: 18,
              }}
            >
              {dummyData?.course_details?.instructor?.name}
            </Text>

            <Text style={{ ...FONTS.body3 }}>
              {dummyData?.course_details?.instructor?.title}
            </Text>
          </View>

          <TextButton
            label="Follow +"
            contentContainerStyle={{
              width: 80,
              height: 35,
              borderRadius: 20,
            }}
            labelStyle={{
              ...FONTS.h3,
              fontWeight: "500",
            }}
          />
        </View>
      </View>
    );
  }

  function renderChapter() {
    return (
      <View>
        {dummyData?.course_details?.videos.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                alignItems: "center",
                height: 70,
                backgroundColor: item?.is_playing
                  ? COLORS.additionalColor11
                  : null,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: SIZES.padding,
                  alignItems: "center",
                  height: 70,
                }}
              >
                <Image
                  source={
                    item?.is_complete
                      ? icons.completed
                      : item?.is_playing
                      ? icons.play_1
                      : icons.lock
                  }
                  style={{ width: 40, height: 40 }}
                />

                <View
                  style={{
                    flex: 1,
                    marginLeft: SIZES.radius,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h3,
                      fontWeight: "500",
                    }}
                  >
                    {item?.title}
                  </Text>

                  <Text style={{ color: COLORS.gray30, ...FONTS.body4 }}>
                    {item?.duration}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ color: COLORS.gray30, ...FONTS.body4 }}>
                    {item?.size}
                  </Text>

                  <Image
                    source={
                      item?.is_downloaded ? icons.completed : icons.download
                    }
                    style={{
                      marginLeft: SIZES.base,
                      width: 25,
                      height: 25,
                      tintColor: item?.is_lock ? COLORS.additionalColor4 : null,
                    }}
                  />
                </View>
              </View>

              {item?.is_playing && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: 3,
                    width: item?.progress,
                    backgroundColor: COLORS.primary,
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  function renderPopularCourses() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <View
          style={{ flexDirection: "row", paddingHorizontal: SIZES.padding }}
        >
          <Text style={{ flex: 1, ...FONTS.h2, fontWeight: "600" }}>
            Popular Courses
          </Text>

          <TextButton
            contentContainerStyle={{
              width: 80,
              borderRadius: 30,
              backgroundColor: COLORS.primary,
            }}
            label="See All"
          />
        </View>

        <FlatList
          data={dummyData.courses_list_2}
          listKey="PopularCourses"
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
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
          ItemSeparatorComponent={() => <LineDivider />}
        />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {renderHeader()}

      <LineDivider
        lineStyle={{
          height: 1,
          marginVertical: SIZES.radius,
        }}
      />

      {renderChapter()}

      {renderPopularCourses()}
    </ScrollView>
  );
};

export default CourseChapters;
