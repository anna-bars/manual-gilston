// menu-data.js - Փոխեք բոլոր նկարների ճանապարհները
// Menu data structure
const menuData = {
    'sieving': {
        tabs: [
            { id: 'test-sieves', label: 'Test Sieves', isActive: false },
            { id: 'shakers', label: 'Sieve Shakers', isActive: true },
            { id: 'service', label: 'Sieve Services', isActive: false },
            { id: 'accessories', label: 'Sieve Accessories', isActive: false },
            { id: 'reference-materials', label: 'Standard Reference Materials', isActive: false },
            { id: 'inspection-tools', label: 'Sieve Inspection Tools', isActive: false },
            { id: 'cut-to-order', label: 'Cut-to-order cloth', isActive: false },
        ],
        content: {
            'test-sieves': {
                categories: [
                    { name: 'ASTM Test Sieves', link: '/astm-test-sieves', img: './src/assets/menu-drop-down/sieve/sieving/astm-test-sieves.png' },
                    { name: 'ASTM Supplemental Sieves', link: '/astm-test-sieves-supplemental-sizes', img: './src/assets/menu-drop-down/sieve/sieving/supplemental-sieves.png' },
                    { name: 'ISO Test Sieves', link: '/iso-test-sieves', img: './src/assets/menu-drop-down/sieve/sieving/iso-sieves.avif' },
                    { name: 'Wet-Wash Sieves', link: '/wet-wash-sieves', img: './src/assets/menu-drop-down/sieve/sieving/wet-wash-sieves.png' },
                    { name: '3in Acrylic Frame Sieves', link: '/3-inch-acrylic-frame-test-sieves', img: './src/assets/menu-drop-down/sieve/sieving/3in-acrylic-sieves.avif' },
                    { name: 'Air Jet Sieves', link: '/air-jet-sieves', img: './src/assets/menu-drop-down/sieve/sieving/air-jet-sieve.avif' },
                    { name: 'ASTM Precision Electroformed Sieves', link: '/astm-precision-electroformed-sieves', img: './src/assets/menu-drop-down/sieve/sieving/astm-electro-sieves.avif' },
                    { name: 'Two-Part Replaceable Mesh Sieves', link: '/two-part-replaceable-mesh-sieves', img: './src/assets/menu-drop-down/sieve/sieving/2part-replaceable-sieves.png' },
                    { name: '3in Non-Metallic Sieves', link: '/3-inch-non-metallic-sieves', img: './src/assets/menu-drop-down/sieve/sieving/3in-non-metallic-sieves.avif' },
                ],
                resources: [
                    { title: 'Sieve Analysis of Coarse Aggregate', link: '/blog/sieve-analysis-of-coarse-aggregate', img: './src/assets/menu-drop-down/general-lab/sieve-analysis-blog.avif' },
                    { title: 'Wet Sieving: A Practical Guide', link: '/blog/wet-sieving-practical-guide', img: './src/assets/menu-drop-down/general-lab/wet-sieving-blog.avif' },
                    { title: 'How To Clean Your Test Sieves', link: 'http://www.youtube.com/watch?v=VXvHRKLB-Zc', img: './src/assets/menu-drop-down/general-lab/test-sieve-video.avif', isVideo: true }
                ]
            },
            'shakers': {
                categories: [
                    { name: 'Mechanical Sieve Shakers with Tapping', link: '/mechanical-tapping-shakers', img: './src/assets/menu-drop-down/sieve/sieve-shakers/mechanical-tapping.avif' },
                    { name: 'Mechanical Sieve Shakers without Tapping', link: '/gilson-orbital-sieve-shakers', img: './src/assets/menu-drop-down/sieve/sieve-shakers/shakers2.png' },
                    { name: 'Rotary Sifters', link: '/rotary-sifters-with-tapping', img: './src/assets/menu-drop-down/sieve/sieve-shakers/rotary.png' },
                    { name: 'Vibratory Sieve Shakers', link: '/vibratory-sieve-shakers', img: './src/assets/menu-drop-down/sieve/sieve-shakers/vibratory.png' },
                    { name: 'Sonic Sifters', link: '/sonic-shakers', img: './src/assets/menu-drop-down/sieve/sieve-shakers/sonic.avif' },
                    { name: 'Circular Motion Sieve Shakers', link: '/circular-shakers', img: './src/assets/menu-drop-down/sieve/sieve-shakers/circular.png' },
                    { name: 'Mikro Air Jet Sieve™', link: '/mikro-air-jet-sieve', img: './src/assets/menu-drop-down/sieve/sieve-shakers/air-jet.avif' },
                    { name: 'Gilson Wet-Vac® Wet Sieving Shakers', link: '/gilson-wet-vac-wet-sieve-shaker', img: './src/assets/menu-drop-down/sieve/sieve-shakers/wet-vac.avif' },
                ],
                resources: [
                    { title: 'An Expert Guide to Selecting a Sieve Shaker', link: '/blog/an-expert-guide-to-selecting-a-sieve-shaker', img: './src/assets/menu-drop-down/general-lab/sieve-shaker-blog.avif' },
                    { title: 'Standard Method for Sieve Analysis', link: 'https://www.youtube.com/watch?v=3Xqq1cxhD-s', img: './src/assets/menu-drop-down/general-lab/sieve-shaker-2-video.avif', isVideo: true },
                    { title: 'Gilson Sieve Shakers', link: 'https://www.youtube.com/watch?v=w6YJMT5BChs', img: './src/assets/menu-drop-down/general-lab/sieve-shaker-video.avif', isVideo: true }
                ]
            },
            // ... շարունակեք բոլոր մյուսների համար նույն կերպ
        }
    },
    // ... մյուս կատեգորիաների համար նույն կերպ փոխեք բոլոր նկարների ճանապարհները
};

// Սահմանեք մեկ ֆունկցիա՝ նկարների ճանապարհները ճիշտ կառուցելու համար
function getImagePath(path) {
    return `./src/assets/${path}`;
}

// Կամ օգտագործեք այս ֆունկցիան բոլոր նկարների համար
const imagePaths = {
    'astmTestSieves': './src/assets/menu-drop-down/sieve/sieving/astm-test-sieves.png',
    'mechanicalTapping': './src/assets/menu-drop-down/sieve/sieve-shakers/mechanical-tapping.avif',
    // ... ավելացրեք բոլոր մյուս նկարների ճանապարհները
};

window.menuData = menuData;
console.log('menuData has been set to window object');