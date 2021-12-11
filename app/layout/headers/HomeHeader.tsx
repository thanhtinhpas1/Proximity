import dateFormat from 'dateformat';
import React, { useContext } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { AppContext } from '@app/context';
import { Typography } from '@app/theme';
import { ThemeColors } from '@app/types/theme';

const { FontWeights, FontSizes } = Typography;

interface HomeHeaderProps {
  IconRight?: React.FC
};

const HomeHeader: React.FC<HomeHeaderProps> = ({ IconRight }) => {

  const { theme } = useContext(AppContext);
  let weekdayNow = dateFormat(new Date(), 'dddd');
  switch (weekdayNow) {
    case "Monday":
      weekdayNow = "Thứ hai"
      break;
      case "Tuesday":
        weekdayNow = "Thứ ba"
        break;
      case "Webnesday":
        weekdayNow = "Thứ tư"
        break;
      case "Thursday":
        weekdayNow = "Thứ năm"
        break;
      case "Saturday":
        weekdayNow = "Thứ sáu"
        break;
      case "Friday":
        weekdayNow = "Thứ bảy"
        break;
      case "Sunday":
        weekdayNow = "Chủ nhật"
    default:
      break;
  }
  return (
    <View style={styles(theme).container}>
      <View>
        <Text style={styles(theme).topTitle}>VNLINE</Text>
        <Text style={styles(theme).title}>{weekdayNow}</Text>
      </View>
      {IconRight && <IconRight />}
    </View>
  );
};

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  topTitle: {
    ...FontWeights.Light,
    ...FontSizes.Caption,
    color: theme.text02,
    letterSpacing: 4
  },
  title: {
    ...FontWeights.Light,
    ...FontSizes.Heading,
    marginTop: Platform.select({ ios: 2, android: 0 }),
    color: theme.text01
  }
});

export default HomeHeader;