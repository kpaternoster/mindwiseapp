import { TextStyle } from 'react-native';
export const fonts = {
  nunitoRegular: 'Nunito-Regular',
  nunitoSemiBold: 'Nunito-SemiBold',
  nunitoBold: 'Nunito-Bold',
};

export const t: Record<string, TextStyle> = {
  title32SemiBold: {
    fontFamily: fonts.nunitoSemiBold,
    fontWeight: 600,
    fontSize: 32,
    lineHeight: 36
  },
  title26SemiBold: {
    fontFamily: fonts.nunitoSemiBold,
    fontWeight: 600,
    fontSize: 26,
    lineHeight: 32

  },
  title24SemiBold: {
    fontFamily: fonts.nunitoSemiBold,
    fontWeight: 600,
    fontSize: 24,
    lineHeight: 36
  },
  title20SemiBold: {
    fontFamily: fonts.nunitoSemiBold,
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 0.4,
  },
  title16SemiBold: {
    fontFamily: fonts.nunitoSemiBold,
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 20
  },
  title16Bold: {
    fontFamily: fonts.nunitoBold,
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 20
  },
  button: {
    fontFamily: fonts.nunitoSemiBold,
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 20
  },
  textBold: {
    fontFamily: fonts.nunitoBold,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 16
  },
  textSemiBold: {
    fontFamily: fonts.nunitoSemiBold,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 20
  },
  textRegular: {
    fontFamily: fonts.nunitoRegular,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 20
  },
  footnoneMedium: {
    fontFamily: fonts.nunitoRegular,
    fontWeight: 500,
    fontSize: 10,
    lineHeight: 15
  },
  textMedium: {
    fontFamily: fonts.nunitoRegular,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 20
  },
  footnoteRegular: {
    fontFamily: fonts.nunitoRegular,
    fontWeight: 500,
    fontSize: 10,
    lineHeight: 15
  },
  footnoteBold: {
    fontFamily: fonts.nunitoBold,
    fontWeight: 500,
    fontSize: 10,
    lineHeight: 15
  },
  captionBold: {
    fontFamily: fonts.nunitoBold,
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 16
  },
};




  