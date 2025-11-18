export type TutorialStep = {
    id: number;
    title: string;
    description: string;
    narrative: string;
};

export const TUTORIAL_STEPS: TutorialStep[] = [
    {
        id: 1,
        title: 'Welcome to Mindwise DBT',
        description: "This quick orientation will help you navigate all the features and tools available to support your DBT journey.",
        narrative: "Meet Alex, who felt lost and overwhelmed when they first heard about DBT. 'Will this actually help me?' they wondered. Six months later, Alex says this app became their daily companion for healing. Let's explore how it can support your journey too."
    },
    {
        id: 2,
        title: 'Daily Check-In',
        description: '',
        narrative: "Yesterday, Marcus noticed he felt overwhelmed after work but couldn't pinpoint why. Today, after using his daily check-in, he realized it happens every Tuesday after team meetings. Just like Marcus, you'll start recognizing your patterns and celebrating small victories."
    },
    {
        id: 3,
        title: 'Learn Skills',
        description: '',
        narrative: "When Emma's friend canceled plans last minute, she felt rejected and angry. But after learning about 'Check the Facts,' she realized her friend was genuinely sick. Now Emma uses this skill whenever strong emotions hit - and you can too.",
    },
    {
        id: 4,
        title: 'Use Skills',
        description: '',
        narrative: "Jordan used to feel helpless during conflicts with their partner. Now they pause and use the DEAR MAN skill. 'It's not magic,' Jordan explains, 'but having a framework helps me communicate my needs without attacking or shutting down. Our relationship has improved dramatically.'",
    },
    {
        id: 5,
        title: 'My Favorites',
        description: '',
        narrative: "Sarah discovered that having her most-used skills just one tap away made all the difference during stressful moments. Your favorites become your personal toolkit for emotional wellness.",
    },
    {
        id: 6,
        title: 'Crisis Support',
        description: '',
        narrative: "When Lisa felt overwhelmed by suicidal thoughts last month, she didn't know where to turn. This section gave her immediate access to her safety plan, breathing exercises, and her therapist's contact - all in under 30 seconds. It can do the same for you.",
    },
    {
        id: 7,
        title: "You’re Ready!",
        description: '',
        narrative: "Start your DBT journey with confidence"
    }
];

export const getTutorialStep = (id: number): TutorialStep | undefined => {
    return TUTORIAL_STEPS.find(step => step.id === id);
};

export const getTotalSteps = (): number => {
    return TUTORIAL_STEPS.length;
};

