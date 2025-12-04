export type OnboardingStackParams = {
  Splash: undefined;
  Welcome: undefined;
  TutorialIntro: undefined;
  Tutorial: { stepId: number };
  Login: undefined;
  ForgotPassword: undefined;
  Otp: { email: string; verificationToken: string };
  SetNewPassword: { changePasswordToken: string };
  CreateAccount: undefined;
  PlanSelect: undefined;
  PlanBilling: {plan: 'individual' | 'therapistPractice'; billingPeriod: 'monthly' | 'yearly';};
  PersonaliseExperience: undefined;
};

export type HomeStackParams = {
  // Home
  Home: undefined;
  
  // Tutorial (shared)
  TutorialIntro: undefined;
  Tutorial: { stepId: number };

  // Plan
  Plan: undefined;
  Plan2: undefined;

  Plan_PreTreatment: undefined;
  Plan_Crisis: undefined;
  Plan_Diary: undefined;
  Plan_DiaryCard_Help: undefined;

  // Pre-Treatment Module
  PreTreatment: undefined;
  DBTOverview: undefined;
  UnderstandYourself: undefined;
  UnderstandEmotions: undefined;
  AboutDBT: undefined;
  DBTSkills: undefined;
  DBTJourney: undefined;
  TreatmentAssessment: undefined;
  StrengthsResources: undefined;
  BuildingCommitment: undefined;
  LetterFromFutureSelf: undefined;
  SignYourCommitments: undefined;
  TreatmentPlan: undefined;

  // Daily Check-In Module
  DailyCheckIn: undefined;
  TodayCheckIn: undefined;
  WeeklyReview: undefined;
  ProgressTracking: undefined;

  // Account Module
  Account: undefined;
  Account_Favorites: undefined;
  Account_Contacts: undefined;
  Account_Privacy: undefined;
  Account_Settings: undefined;
  Account_Help: undefined;

  Learn: undefined;
  Learn_UnderstandEmotions: undefined;
  Learn_EmotionsWheel: undefined;
  Learn_EmotionsWheelExercises: undefined;
  Learn_NameYourEmotions: undefined;
  Learn_EmotionsTracker: undefined;
  Learn_PracticeWithOthers: undefined;
  Learn_AboutSUDS: undefined;
  Learn_SUDSExercises: undefined;
  Learn_SUDSCheckIn: undefined;
  Learn_SUDSCopingPlan: undefined;
  Learn_AboutSTUNWAVE: undefined;
  Learn_STUNWAVEExercises: undefined;
  Learn_STUNWAVECheckIn: undefined;
  Learn_STUNWAVEEntries: undefined;
  Act: undefined;
  Help: undefined;
  Help_Reason: undefined;

  Notifications: undefined;

  Chat: undefined;
}

export type AllStackParams = OnboardingStackParams & HomeStackParams;

export type RootStackParams = {
  Onboarding: undefined;
  Home: undefined;
};
