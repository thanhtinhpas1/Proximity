import ImagePicker, { Options } from 'react-native-image-crop-picker';
import { ThemeStatic } from '@app/theme';
import { Timeouts } from '@app/constants';
import { noPermissionNotification } from './notifications';
import { ExplorePost } from '@app/types/screens';

export const createAsyncDelay = (duration: number) => {
  return new Promise((resolve, _) =>
    setTimeout(() => {
      resolve(null);
    }, duration),
  );
};

export const parseConnectionsCount = (connectionCount: number) => {
  // parse larger numbers here
  return connectionCount.toString();
};

export const parseTimeElapsed = (utcTime: string) => {
  const timeNow = new Date().getTime();
  const actionTime = new Date(utcTime).getTime();

  let difference = timeNow - actionTime;

  const secondsInMs = 1000;
  const minutesInMs = secondsInMs * 60;
  const hoursInMs = minutesInMs * 60;
  const daysInMs = hoursInMs * 24;
  const weekInMs = daysInMs * 7;

  const elapsedWeeks = parseInt((difference / weekInMs) as any, 10);
  difference = difference % weekInMs;

  const elapsedDays = parseInt((difference / daysInMs) as any, 10);
  difference = difference % daysInMs;

  const elapsedHours = parseInt((difference / hoursInMs) as any, 10);
  difference = difference % hoursInMs;

  const elapsedMinutes = parseInt((difference / minutesInMs) as any, 10);
  difference = difference % minutesInMs;

  let parsedTime = '...';

  if (elapsedWeeks >= 1) {
    if (elapsedWeeks === 1) {
      parsedTime = `${elapsedWeeks} tuần`;
    } else {
      parsedTime = `${elapsedWeeks} tuần`;
    }
  } else if (elapsedDays >= 1) {
    if (elapsedDays === 1) {
      parsedTime = `${elapsedDays} ngày`;
    } else {
      parsedTime = `${elapsedDays} ngày`;
    }
  } else if (elapsedHours >= 1) {
    if (elapsedHours === 1) {
      parsedTime = `${elapsedHours} giờ`;
    } else {
      parsedTime = `${elapsedHours} giờ`;
    }
  } else if (elapsedMinutes >= 1) {
    if (elapsedMinutes === 1) {
      parsedTime = `${elapsedMinutes} phút`;
    } else {
      parsedTime = `${elapsedMinutes} phút`;
    }
  } else if (elapsedMinutes < 1) parsedTime = 'vừa xong';

  const readableTime =
    parsedTime === 'vừa xong' ? `${parsedTime}` : `${parsedTime} trước`;

  return {
    parsedTime,
    readableTime,
  };
};

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const transformMessages = messages =>
  messages.map(message => {
    const {
      id,
      body,
      createdAt,
      author: { id: authorId, name, avatar },
    } = message;

    return {
      _id: id,
      text: body,
      createdAt: new Date(createdAt),
      user: {
        _id: authorId,
        name,
        avatar,
      },
    };
  });

export const filterChatParticipants = (userId: string, participants) =>
  participants.filter(participant => userId !== participant.id);

export const getImageFromLibrary = async (
  height: number,
  width: number,
  circular: boolean = false,
) => {
  const options: Options = {
    height,
    width,
    cropperCircleOverlay: circular,
    cropping: true,
    cropperActiveWidgetColor: ThemeStatic.accent,
    cropperStatusBarColor: ThemeStatic.accent,
    cropperToolbarColor: ThemeStatic.accent,
    compressImageQuality: 0.8,
    mediaType: 'photo',
    writeTempFile: true
  };

  try {
    const assetData = await ImagePicker.openPicker(options);
    return assetData;
  } catch ({ code }) {
    if (!(code as string).includes('CANCELLED')) {
      noPermissionNotification();
    }
  }
};

export const isUserOnline = (lastSeen: number) => {
  const now = Date.now() / 1000;
  return now - lastSeen < Timeouts.online;
};

export const parseLikes = (likeCount: number) => {
  return `${likeCount} lượt thích`;
};

export const searchQueryFilter = (array, userId: string, query: string) =>
  [...array].filter(({ participants }) => {
    const [participant] = filterChatParticipants(userId, participants);
    if (query === '') return true;
    return participant.handle.toLowerCase().includes(query.toLocaleLowerCase());
  });

export const sortMessageAscendingTime = array =>
  [...array].sort((a, b) => {
    const [lastMessageA] = a.messages;
    const [lastMessageB] = b.messages;

    if (lastMessageA && lastMessageB) {
      // @ts-ignore
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    // @ts-ignore
    return new Date(a.createdAt) - new Date(lastMessageB.createdAt)
  });

export const computeUnreadMessages = (chats, userId: string) =>
  chats.filter(({ messages }) => {
    const [lastMessage] = messages;
    const { author, seen } = lastMessage;

    return !seen && author.id !== userId;
  }).length;

export const sortPostsAscendingTime = array =>
  // @ts-ignore
  [...array].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

export const parseGridImages = (images: ExplorePost[]): ExplorePost[][] => {
  const parsedImages: ExplorePost[][] = [];

  for (let i = 0; i < images.length; i++) {
    let imageGroup: ExplorePost[];

    if (i % 3 === 0) {
      imageGroup = images.slice(i, i + 3);
      parsedImages.push(imageGroup);
    }
  }

  return parsedImages;
};
