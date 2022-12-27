import { View, Text, FlatList, Image, TextInput, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, SIZES, dummyData, icons } from "../../../constants";
import { IconButton, IconLabelButton } from "../../../components";

const CommentSection = ({ commentItem, commentOption, replies }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: SIZES.padding,
      }}
    >
      <Image
        source={commentItem?.profile}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }}
      />

      <View style={{ flex: 1, marginTop: 3, marginLeft: SIZES.radius }}>
        <Text style={{ ...FONTS.h3, fontWeight: "500" }}>
          {commentItem?.name}
        </Text>

        <Text style={{ ...FONTS.body4 }}>{commentItem?.comment}</Text>

        {commentOption}

        {replies}
      </View>
    </View>
  );
};

const CourseDiscussions = () => {
  const [footerPosition, setFooterPosition] = useState(0);
  const [footerHeight, setFooterHeight] = useState(60);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", (e) => {
      setFooterPosition(e.endCoordinates.height);
    });

    const hideSubscription = Keyboard.addListener("keyboardWillHide", (e) => {
      setFooterPosition(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  function renderDiscussions() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={dummyData?.course_details?.discussions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding,
            paddingBottom: 90,
          }}
          renderItem={({ item, index }) => (
            <CommentSection
              commentItem={item}
              commentOption={
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: SIZES.radius,
                    paddingVertical: SIZES.base,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: COLORS.gray20,
                  }}
                >
                  <IconLabelButton
                    icon={icons.comment}
                    label={item?.no_of_comments}
                    iconStyle={{
                      tintColor: COLORS.black,
                    }}
                    labelStyle={{
                      marginLeft: 3,
                      color: COLORS.black,
                      ...FONTS.h4,
                    }}
                  />

                  <IconLabelButton
                    icon={icons.heart}
                    label={item?.no_of_likes}
                    containerStyle={{
                      marginLeft: SIZES.radius,
                    }}
                    labelStyle={{
                      marginLeft: 3,
                      color: COLORS.black,
                      ...FONTS.h4,
                    }}
                  />

                  <Text
                    style={{
                      flex: 1,
                      textAlign: "right",
                      ...FONTS.body4,
                      color: COLORS.gray30,
                    }}
                  >
                    {item?.posted_on}
                  </Text>
                </View>
              }
              replies={
                <FlatList
                  data={item?.replies}
                  scrollEnabled={false}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => (
                    <CommentSection
                      commentItem={item}
                      commentOption={
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: SIZES.radius,
                            paddingVertical: SIZES.base,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: COLORS.gray20,
                          }}
                        >
                          <IconLabelButton
                            icon={icons.reply}
                            label="Reply"
                            labelStyle={{
                              marginLeft: 5,
                              color: COLORS.black,
                              ...FONTS.h4,
                            }}
                          />

                          <IconLabelButton
                            icon={icons.heart_off}
                            label="Like"
                            containerStyle={{
                              marginLeft: SIZES.radius,
                            }}
                            labelStyle={{
                              marginLeft: 3,
                              color: COLORS.black,
                              ...FONTS.h4,
                            }}
                          />

                          <Text
                            style={{
                              flex: 1,
                              textAlign: "right",
                              ...FONTS.h4,
                              color: COLORS.gray30,
                            }}
                          >
                            {item?.posted_on}
                          </Text>
                        </View>
                      }
                    />
                  )}
                />
              }
            />
          )}
        />
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          bottom: footerPosition,
          left: 0,
          right: 0,
          height: footerHeight,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.radius,
          backgroundColor: COLORS.gray10,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            marginRight: SIZES.base,
            ...FONTS.body3,
          }}
          multiline
          placeholder="Type Something"
          placeholderTextColor={COLORS.gray80}
          onContentSizeChange={(event) => {
            const height = event.nativeEvent.contentSize.height;

            if (height <= 60) {
              setFooterHeight(60);
            } else if (height > 60 && height <= 100) {
              setFooterHeight(height);
            } else if (height > 100) {
              setFooterHeight(100);
            }
          }}
        />

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            icon={icons.send}
            iconStyle={{
              height: 25,
              width: 25,
              tintColor: COLORS.primary,
            }}
          />
        </View>
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
      {renderDiscussions()}

      {renderFooter()}
    </View>
  );
};

export default CourseDiscussions;
