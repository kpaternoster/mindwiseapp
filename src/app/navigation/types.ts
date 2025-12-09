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
  Learn_RegulateEmotions: undefined;
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
  Learn_CheckTheFacts: undefined;
  Learn_CheckTheFactsExercises: undefined;
  Learn_CheckTheFactsFinding: undefined;
  Learn_CheckTheFactsEntries: undefined;
  Learn_ChainAnalysis: undefined;
  Learn_ChainAnalysisExercises: undefined;
  Learn_GuidedChainAnalysis: undefined;
  Learn_ChainAnalysisComplete: undefined;
  Learn_SelfCarePlease: undefined;
  Learn_SelfCarePleaseExercises: undefined;
  Learn_SelfCarePleasePlan: undefined;
  Learn_SelfCarePleaseEntries: undefined;
  Learn_SelfCarePleaseReflection: undefined;
  Learn_DialecticalThinking: undefined;
  Learn_DialecticalThinkingExercises: undefined;
  Learn_DialecticalThinkingReframing: undefined;
  Learn_DialecticalThinkingEntries: undefined;
  Learn_DialecticalThinkingExploringPerspectives: undefined;
  Learn_DialecticalThinkingPerspectiveEntries: undefined;
  Learn_ProblemSolving: undefined;
  Learn_ProblemSolvingExercise: undefined;
  Learn_ProblemSolvingEntries: undefined;
  Learn_ProblemSolvingEntryDetail: { entryId: string };
  Learn_ImproveInterpersonalEffectiveness: undefined;
  Learn_BeMindful: undefined;
  Learn_HereAndNow: undefined;
  Learn_HereAndNowExercises: undefined;
  Learn_MindfulPresencePractice: undefined;
  Learn_MindfulPresencePracticeEntries: undefined;
  Learn_MindfulPresencePracticeEntryDetail: { entryId: string };
  Learn_WiseMind: undefined;
  Learn_WiseMindExercises: undefined;
  Learn_WiseMindPractice: undefined;
  Learn_WiseMindPracticeEntries: undefined;
  Learn_WiseMindPracticeEntryDetail: { entryId: string };
  Learn_WiseMindPastDecisions: undefined;
  Learn_WiseMindPastDecisionEntries: undefined;
  Learn_WiseMindPastDecisionEntryDetail: { entryId: string };
  Learn_WillingHands: undefined;
  Learn_WillingHandsExercises: undefined;
  Learn_WillingHandsPractice: undefined;
  Learn_WillingHandsEntries: undefined;
  Learn_WillingHandsEntryDetail: { entryId: string };
  Learn_LovingKindness: undefined;
  Learn_LovingKindnessExercises: undefined;
  Learn_LovingKindnessPractice: undefined;
  Learn_LovingKindnessPracticeEntries: undefined;
  Learn_LovingKindnessPracticeEntryDetail: { entryId: string };
  Learn_MiddlePath: undefined;
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
