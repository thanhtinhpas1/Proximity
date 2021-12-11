import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import BottomSheetHeader from '../headers/BottomSheetHeader';
import SvgBanner from '../misc/SvgBanner';
import EmptyConnectionsBanner from '@app/assets/svg/empty-connections.svg';
import { Connections } from '@app/constants';
import { AppContext } from '@app/context';
import { ThemeColors } from '@app/types/theme';
import UserCard from './UserCard';
import { Connection } from '@app/types/screens';

interface ConnectionsBottomSheetProps {
  ref: React.Ref<any>,
  viewMode?: boolean,
  data: Connection[],
  handle?: string,
  type: string
};

const ConnectionsBottomSheet: React.FC<ConnectionsBottomSheetProps> = React.forwardRef(({ viewMode, handle, data, type }, ref) => {

  const { theme } = useContext(AppContext);

  let heading;
  let subHeading;

  if (type === Connections.FOLLOWING) {
    heading = 'Đang theo dõi';
    if (viewMode) {
      subHeading = `Bạn bè ${handle} đang theo dõi`;
    } else {
      subHeading = 'Bạn bè bạn đang theo dõi';
    }
  } else if (type === Connections.FOLLOWERS) {
    heading = 'Theo dõi bạn';
    if (viewMode) {
      subHeading = `Bạn bè đang theo dõi ${handle}`;
    } else {
      subHeading = 'Bạn bè đang theo dõi bạn';
    }
  }

  const ListEmptyComponent = () => (
    <SvgBanner
      Svg={EmptyConnectionsBanner}
      placeholder='Không tìm thấy người dùng'
      spacing={16}
    />
  );

  const renderItem = ({ item }) => {
    const { id, avatar, handle, name } = item;
    return (
      <UserCard
        userId={id}
        avatar={avatar}
        handle={handle}
        name={name}
      />
    );
  };

  return (
    <Modalize
      //@ts-ignore
      ref={ref}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      modalStyle={styles(theme).container}>
      <BottomSheetHeader
        heading={heading}
        subHeading={subHeading}
      />
      <View style={styles(theme).content}>
        <FlatGrid
          bounces={false}
          itemDimension={responsiveWidth(85)}
          showsVerticalScrollIndicator={false}
          items={data}
          itemContainerStyle={styles().listItemContainer}
          contentContainerStyle={styles().listContentContainer}
          ListEmptyComponent={ListEmptyComponent}
          style={styles().listContainer}
          spacing={20}
          renderItem={renderItem}
        />
      </View>
    </Modalize>
  );
});

const styles = (theme = {} as ThemeColors) => StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
    backgroundColor: theme.base
  },
  content: {
    flex: 1,
    paddingBottom: responsiveHeight(5)
  },
  listContainer: {
    flex: 1
  },
  listItemContainer: {
    width: '106%'
  },
  listContentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

export default ConnectionsBottomSheet;