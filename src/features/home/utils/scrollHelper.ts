import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

/**
 * Calculates the current reading progress step based on scroll position
 * @param event - The scroll event from ScrollView
 * @param totalSteps - Total number of progress steps
 * @param setCurrentStep - State setter function to update current step
 */
export const handleScrollProgress = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    totalSteps: number,
    setCurrentStep: (value: number | ((prev: number) => number)) => void
) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollY = contentOffset.y;
    const scrollHeight = contentSize.height;
    const viewportHeight = layoutMeasurement.height;

    const scrollableHeight = scrollHeight - viewportHeight;
    
    // Calculate scroll percentage (0 to 1)
    const scrollPercentage = scrollableHeight > 0 ? scrollY / scrollableHeight : 0;

    // Calculate current step based on scroll percentage
    // Divide content into equal sections based on totalSteps
    const stepThreshold = 1 / totalSteps;
    let newStep = 1;
    
    for (let i = 1; i <= totalSteps; i++) {
        if (scrollPercentage >= (i - 1) * stepThreshold) {
            newStep = i;
        }
    }

    // Ensure we reach the final step when near bottom (95%+)
    if (scrollPercentage >= 0.95) {
        newStep = totalSteps;
    }

    setCurrentStep((prevStep) => {
        // Once final step is reached, keep it there
        if (prevStep === totalSteps) {
            return totalSteps;
        }
        return newStep;
    });
};

