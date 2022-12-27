import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES, dummyData, icons } from "../../../constants";
import { IconButton, TextButton } from "../../../components";

const CourseFiles = () => {
  function renderStudents() {
    let students = [];

    if (dummyData?.course_details?.students.length > 3) {
      students = dummyData?.course_details?.students.slice(0, 3);
    } else {
      students = dummyData?.course_details?.students;
    }

    return (
      <View>
        <Text style={{ ...FONTS.h2, fontWeight: "600", fontSize: 25 }}>
          Students
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            alignItems: "center",
          }}
        >
          {students.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  marginLeft: index > 0 ? SIZES.radius : 0,
                }}
              >
                <Image
                  source={item?.thumbnail}
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
              </View>
            );
          })}

          {dummyData?.course_details?.students.length > 3 && (
            <TextButton
              label="View All"
              labelStyle={{
                color: COLORS.primary,
              }}
              contentContainerStyle={{
                backgroundColor: null,
                marginLeft: SIZES.padding,
              }}
            />
          )}
        </View>
      </View>
    );
  }

  function renderFiles() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        <Text
          style={{
            ...FONTS.h2,
            fontWeight: "600",
            fontSize: 25,
          }}
        >
          Files
        </Text>

        {dummyData?.course_details?.files.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                marginTop: SIZES.radius,
              }}
            >
              <Image
                source={item?.thumbnail}
                style={{
                  width: 80,
                  height: 80,
                }}
              />

              <View
                style={{
                  flex: 1,
                  marginLeft: SIZES.radius,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h2,
                    fontWeight: "600",
                  }}
                >
                  {item?.name}
                </Text>
                <Text
                  style={{
                    color: COLORS.gray30,
                    ...FONTS.body3,
                  }}
                >
                  {item?.author}
                </Text>
                <Text style={{ ...FONTS.body4 }}>{item?.upload_date}</Text>
              </View>

              <IconButton
                icon={icons.menu}
                iconStyle={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.black,
                }}
                containerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                  alignSelf: "flex-start",
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: SIZES.padding,
      }}
    >
      {renderStudents()}

      {renderFiles()}
    </ScrollView>
  );
};

export default CourseFiles;
