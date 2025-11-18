/**
 * Chart Helper Utilities
 * Functions for creating smooth curves and chart paths
 */

/**
 * Monotone Cubic Spline interpolation for smooth curves
 * This creates natural-looking curves between data points without overshooting
 * Uses the same algorithm as D3.js for professional chart quality
 * 
 * @param points - Array of {x, y} coordinates to interpolate
 * @returns SVG path string with smooth cubic bezier curves
 */
export const createSmoothPath = (points: Array<{ x: number; y: number }>): string => {
    if (points.length < 2) return '';
    if (points.length === 2) {
        return `M ${points[0].x},${points[0].y} L ${points[1].x},${points[1].y}`;
    }

    // Calculate slopes (tangents) for each point
    const n = points.length;
    const slopes: number[] = [];
    
    // Calculate secants (differences between points)
    const dxs: number[] = [];
    const dys: number[] = [];
    const ms: number[] = [];
    
    for (let i = 0; i < n - 1; i++) {
        const dx = points[i + 1].x - points[i].x;
        const dy = points[i + 1].y - points[i].y;
        dxs.push(dx);
        dys.push(dy);
        ms.push(dy / dx);
    }
    
    // Calculate tangents (slopes) for each point
    slopes.push(ms[0]);
    
    for (let i = 1; i < n - 1; i++) {
        const m0 = ms[i - 1];
        const m1 = ms[i];
        
        if (m0 * m1 <= 0) {
            slopes.push(0);
        } else {
            const dx0 = dxs[i - 1];
            const dx1 = dxs[i];
            const common = dx0 + dx1;
            slopes.push(3 * common / ((common + dx0) / m0 + (common + dx1) / m1));
        }
    }
    
    slopes.push(ms[n - 2]);
    
    // Build the path using cubic bezier curves
    let path = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 0; i < n - 1; i++) {
        const x0 = points[i].x;
        const y0 = points[i].y;
        const x1 = points[i + 1].x;
        const y1 = points[i + 1].y;
        const m0 = slopes[i];
        const m1 = slopes[i + 1];
        const dx = (x1 - x0) / 3;
        
        // Calculate control points for cubic bezier
        const cp1x = x0 + dx;
        const cp1y = y0 + m0 * dx;
        const cp2x = x1 - dx;
        const cp2y = y1 - m1 * dx;
        
        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x1},${y1}`;
    }
    
    return path;
};

/**
 * Create an area path for filled charts
 * Combines a smooth line path with a baseline to create a filled area
 * 
 * @param points - Array of {x, y} coordinates
 * @param baselineY - Y coordinate for the bottom of the area (default: bottom of first point)
 * @returns SVG path string for area fill
 */
export const createSmoothAreaPath = (
    points: Array<{ x: number; y: number }>,
    baselineY?: number
): string => {
    if (points.length < 2) return '';
    
    const baseline = baselineY ?? points[0].y;
    const linePath = createSmoothPath(points);
    
    // Create area path by drawing to baseline and back
    const areaPath = `
        M ${points[0].x},${baseline}
        L ${points[0].x},${points[0].y}
        ${linePath.substring(linePath.indexOf(' '))}
        L ${points[points.length - 1].x},${baseline}
        Z
    `;
    
    return areaPath;
};

