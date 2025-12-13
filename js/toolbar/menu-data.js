// menu-data.js
console.log('menu-data.js loaded');

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
            'service': {
                categories: [
                    { name: 'Verification of New Sieves', link: '/test-sieve-verification', img: './src/assets/menu-drop-down/sieve/sieve-services/verification.avif' },
                    { name: 'Reverification of Used Sieves', link: '/test-sieve-reverification', img: './src/assets/menu-drop-down/sieve/sieve-services/reverification.avif' },
                    { name: 'Master-Matched Services', link: '/master-matched-services-for-sieves', img: './src/assets/menu-drop-down/sieve/sieve-services/master-matched.avif' },
                ],
                resources: [
                    { title: 'A Guide to Acing the Sieve Grade Selection Process', link: '/blog/compliance-inspection-or-calibration-astm-test-sieves-whats-right-for-me', img: './src/assets/menu-drop-down/general-lab/sieving-blog.avif' },
                    { title: 'Gilson Verification of New Test Sieves', link: 'https://www.youtube.com/watch?v=xVBdk5tBhHU', img: './src/assets/menu-drop-down/general-lab/test-sieve-video.avif', isVideo: true },
                    { title: 'Gilson Master-Matched Services', link: 'https://www.youtube.com/watch?v=yDiZrQTNXRg', img: './src/assets/menu-drop-down/general-lab/test-sieve-2-video.avif', isVideo: true }
                ]
            },
            'accessories': {
                categories: [
                    { name: 'Sieve Pans & Covers', link: '/sieve-pans-covers', img: './src/assets/menu-drop-down/sieve/sieve-accessories/pans-covers.avif' },
                    { name: 'Wet Sieving Essentials', link: '/wet-sieving-essentials', img: './src/assets/menu-drop-down/sieve/sieve-accessories/wet-sieving-essentials.png' },
                    { name: 'Sieve Spacers', link: '/sieve-spacers', img: './src/assets/menu-drop-down/sieve/sieve-accessories/sieve-spacers.avif' },
                    { name: 'Scoops', link: '/sample-material-scoops', img: './src/assets/menu-drop-down/sieve/sieve-accessories/scoops.avif' },
                    { name: 'Sieve Brushes', link: '/sieve-brushes', img: './src/assets/menu-drop-down/sieve/sieve-accessories/sieve-brushes.avif' },
                    { name: 'Ultrasonic Sieve Cleaners', link: '/ultrasonic-sieve-cleaners', img: './src/assets/menu-drop-down/sieve/sieve-accessories/ultrasonic-sieve-cleaners.avif' },
                    { name: 'Sieve Storage Racks', link: '/sieve-storage-racks', img: './src/assets/menu-drop-down/sieve/sieve-accessories/sieve-storage-racks.png' },
                    { name: 'Sieving Aid', link: '/sieving-aid', img: './src/assets/menu-drop-down/sieve/sieve-accessories/sieving-aid.avif' },
                    { name: 'Magnetic Separators', link: '/magnetic-separators', img: './src/assets/menu-drop-down/sieve/sieve-accessories/magnetic-separators.avif' },
                    { name: 'Clean-N-Stor', link: '/clean-n-stor', img: './src/assets/menu-drop-down/sieve/sieve-accessories/clean-n-stor.png' },
                ],
                resources: [
                    { title: 'Sieve Analysis of Coarse Aggregate: Sample Prepping', link: '/blog/sample-prepping-for-coarse-aggregate-sieve-analysis', img: './src/assets/menu-drop-down/general-lab/coarse-sieving-blog.avif' },
                    { title: 'How to Clean Your Test Sieves', link: '/blog/how-to-clean-a-sieve', img: './src/assets/menu-drop-down/general-lab/wet-sieving-blog.avif' },
                    { title: 'Wet Sieving: A Practical Guide', link: 'https://www.youtube.com/watch?v=YKgmelyCc68', img: './src/assets/menu-drop-down/general-lab/test-sieve-3-video.avif', isVideo: true }
                ]
            },
            'reference-materials': {
                categories: [
                    { name: 'Whitehouse Sieve Standards', link: '/whitehouse-sieve-standards', img: './src/assets/menu-drop-down/sieve/sieve-reference-materials/whitehouse-srm.avif' },
                    { name: 'NIST Reference Materials', link: '/nist-reference-materials', img: './src/assets/menu-drop-down/sieve/sieve-reference-materials/nist-srm.avif' },
                ],
                resources: [
                    { title: 'Reference Materials for Test Sieves: Performance Testing for Quality', link: '/blog/reference-materials-for-test-sieves-performance-testing-for-quality', img: './src/assets/menu-drop-down/general-lab/sieve-srm-blog.avif' },
                    { title: 'How to Optimize Fines Content Determinations', link: '/blog/how-to-optimize-fines-content-determinations', img: './src/assets/menu-drop-down/general-lab/sieve-analysis-2-blog.avif' },
                    { title: 'Choosing the Right Test Sieve: Test Specifications', link: 'https://www.youtube.com/watch?v=Acjw3FR_H6c', img: './src/assets/menu-drop-down/general-lab/test-sieve-video.avif', isVideo: true }
                ]
            },
            'inspection-tools': {
                categories: [
                    { name: 'Digital Calipers', link: '/digital-calipers', img: './src/assets/menu-drop-down/sieve/sieve-inspections-tools/digital-calipers.png' },
                    { name: 'Pocket Magnifier', link: '/pocket-magnifier', img: './src/assets/menu-drop-down/sieve/sieve-inspections-tools/pocket-magnifier.avif' },
                    { name: 'Screen Opening Gauge', link: '/screen-opening-gauge', img: './src/assets/menu-drop-down/sieve/sieve-inspections-tools/screen-opening-gauge.avif' },
                    { name: '10x Optical Comparator', link: '/10x-optical-comparator', img: './src/assets/menu-drop-down/sieve/sieve-inspections-tools/optical-comparator.png' },
                ],
                resources: [
                    { title: 'Tips to Preserve & Extend Service Life of Your Equipment', link: '/blog/simple-steps-to-preserve-extend-service-life-of-costly-equipment', img: './src/assets/menu-drop-down/general-lab/sieve-srm-blog.avif' },
                    { title: '5 Steps to Setting Up a Flawless Quality Control Program', link: '/blog/test-sieves-setting-up-a-quality-control-program', img: './src/assets/menu-drop-down/general-lab/sieving-blog.avif' },
                    { title: 'Choosing the Right Test Sieve Mesh', link: 'https://www.youtube.com/watch?v=Jq0DrMyhEPk', img: './src/assets/menu-drop-down/general-lab/test-sieve-video.avif', isVideo: true }
                ]
            },
            'cut-to-order': {
                categories: [
                    { name: 'ASTM Wire Cloth', link: '/astm-testing-grade-wire-cloth', img: './src/assets/menu-drop-down/cut-to-order-cloth/astm-wire-cloth.png' },
                    { name: 'Polyester and Nylon Cloth', link: '/polyester-nylon-monofilament-screen-fabric', img: './src/assets/menu-drop-down/cut-to-order-cloth/poly-cloth.avif' },
                ],
                resources: [
                    { title: 'Selecting the Right Sieve for Non-Conventional Use', link: '/blog/selecting-the-right-test-sieve-for-non-conventional-use', img: './src/assets/menu-drop-down/general-lab/test-sieves-blog.avif' },
                    { title: 'Hand Sieving Method for Materials Sieve Analysis', link: 'https://www.youtube.com/watch?v=Jf_p934fSpA', img: './src/assets/menu-drop-down/general-lab/test-sieve-3-video.avif', isVideo: true },
                    { title: 'Choosing the Right Specialized Test Sieve', link: 'https://www.youtube.com/watch?v=9me8RbBGZlE', img: './src/assets/menu-drop-down/general-lab/specialty-sieves-video.avif', isVideo: true }
                ]
            }
        }
    },
    'screening': {
        tabs: [
            { id: 'screen-shakers', label: 'Screen Shakers', isActive: true },
            { id: 'screen-trays', label: 'Screen Trays', isActive: false },
            { id: 'screen-accessories', label: 'Screen Accessories', isActive: false },
        ],
        content: {
            'screen-shakers': {
                categories: [
                    { name: 'Gilson Testing Screens', link: '/gilson-testing-screens', img: './src/assets/menu-drop-down/screening/testing-screen.avif' },
                    { name: 'Gilson Test-Master® Testing Screens', link: '/gilson-test-master-testing-screens', img: './src/assets/menu-drop-down/screening/test-master.avif' },
                    { name: 'Gilson Porta-Screen®', link: '/gilson-porta-screen', img: './src/assets/menu-drop-down/screening/porta.avif' },
                    { name: 'Continuous-Flow Screen', link: '/continuous-flow-screen', img: './src/assets/menu-drop-down/screening/continuous-flow.png' },
                    { name: 'Rocker Screen Set', link: '/rocker-screen-set', img: './src/assets/menu-drop-down/screening/rocker-screen.png' },
                    { name: 'Gilso-Matic® Screening Assemblies', link: '/gilso-matic-screening-assemblies', img: './src/assets/menu-drop-down/screening/gilsomatic.avif' },
                ],
                resources: [
                    { title: 'Screen Shaking Techniques Guide', link: '/blog/screen-shaking-techniques', img: './src/assets/menu-drop-down/general-lab/coarse-gradation-blog.avif' },
                    { title: 'Screen Shaker Maintenance', link: 'https://www.youtube.com/watch?v=example1', img: './src/assets/menu-drop-down/general-lab/screen-shakers-video.avif', isVideo: true },
                    { title: 'Choosing the Right Screen Shaker', link: '/blog/choosing-screen-shaker', img: './src/assets/menu-drop-down/general-lab/screening-accessories-video.avif' }
                ]
            },
            'screen-trays': {
                categories: [
                    { name: 'ASTM Testing Screen & Test-Master® Trays', link: '/astm-testing-screen-test-master-trays', img: './src/assets/menu-drop-down/screening/astm-screen-trays.avif' },
                    { name: 'ISO Testing Screen & Test-Master® Trays', link: '/iso-testing-screen-test-master-trays', img: './src/assets/menu-drop-down/screening/iso-screen-trays.png' },
                    { name: 'ASTM Perforated Plate Testing Screen & Test-Master® Trays', link: '/astm-perforated-plate-testing-screen-trays', img: './src/assets/menu-drop-down/screening/perforated-trays.png' },
                    { name: 'ASTM Porta-Screen® Trays', link: '/astm-porta-screen-trays', img: './src/assets/menu-drop-down/screening/astm-porta-trays.avif' },
                    { name: 'ISO Porta-Screen® Trays', link: '/iso-porta-screen-trays', img: './src/assets/menu-drop-down/screening/iso-screen-trays.png' },
                    { name: 'Continuous-Flow Screen Trays', link: '/continuous-flow-screen-trays', img: './src/assets/menu-drop-down/screening/continuous-flow-tray.avif' },
                    { name: 'Rocker Screen Wire Cloth', link: '/rocker-screen-wire-cloth', img: './src/assets/menu-drop-down/cut-to-order-cloth/astm-wire-cloth.png' },
                    { name: 'Gilso-Matic® Screen Trays', link: '/gilso-matic-screen-trays', img: './src/assets/menu-drop-down/screening/gilsomatic.avif' },
                    { name: 'Verification of New Trays', link: '/verification-of-new-trays', img: './src/assets/menu-drop-down/screening/tray-verification.avif' },
                    { name: 'Reverification of Used Trays', link: '/reverification-of-used-trays', img: './src/assets/menu-drop-down/screening/tray-reverification.avif' },
                ],
                resources: [
                    { title: 'Screen Tray Selection Guide', link: '/blog/screen-tray-selection', img: './src/assets/menu-drop-down/general-lab/test-screen-blog.avif' },
                    { title: 'Screen Tray Installation', link: 'https://www.youtube.com/watch?v=example2', img: './src/assets/menu-drop-down/general-lab/screen-shaker-video.avif', isVideo: true },
                    { title: 'Tray Maintenance Best Practices', link: '/blog/tray-maintenance-best-practices', img: './src/assets/menu-drop-down/general-lab/screen-tray-video.avif' }
                ]
            },
            'screen-accessories': {
                categories: [
                    { name: 'Screen Tray Storage Rack', link: '/screen-tray-storage-rack', img: './src/assets/menu-drop-down/screening/screen-tray-rack.avif' },
                    { name: 'Porta-Screen® Tray Rack', link: '/porta-screen-tray-rack', img: './src/assets/menu-drop-down/screening/porta-tray-rack.avif' },
                    { name: 'Clean-N-Weigh Accessory', link: '/clean-n-weigh-accessory', img: './src/assets/menu-drop-down/screening/clean-n-weigh.png' },
                    { name: 'Brushes', link: '/screen-tray-brushes', img: './src/assets/menu-drop-down/screening/screen-tray-brushes.avif' },
                    { name: 'Scoops', link: '/screening-scoops', img: './src/assets/menu-drop-down/sieve/sieve-accessories/scoops.avif' },
                    { name: 'Material Handling Pans', link: '/material-handling-pans', img: './src/assets/menu-drop-down/screening/material-handling-pan.avif' },
                    { name: 'Dustpans', link: '/screening-dustpans', img: './src/assets/menu-drop-down/screening/screening-pan.avif' },
                    { name: 'Digital Lab Timer', link: '/digital-lab-timer', img: './src/assets/menu-drop-down/screening/screening-timer.avif' },
                    { name: 'Speed Variation Accessory', link: '/speed-variation-accessory', img: './src/assets/menu-drop-down/screening/speed-variation-accessory.avif' },
                    { name: 'Digital Calipers', link: '/screening-digital-calipers', img: './src/assets/menu-drop-down/sieve/sieve-inspections-tools/digital-calipers.png' },
                    { name: 'Pocket Magnifier', link: '/screening-pocket-magnifier', img: './src/assets/menu-drop-down/sieve/sieve-inspections-tools/pocket-magnifier.avif' },
                    { name: 'Screen Opening Gauge', link: '/screen-opening-gauge', img: './src/assets/menu-drop-down/sieve/sieve-inspections-tools/screen-opening-gauge.avif' },
                    { name: 'Door Enclosure', link: '/door-enclosure', img: './src/assets/menu-drop-down/screening/door-enclosure.avif' },
                    { name: 'Sound Enclosure', link: '/sound-enclosure', img: './src/assets/menu-drop-down/screening/sound-enclosure.avif' },
                    { name: 'Hydraulic Clamping Conversion Kit', link: '/hydraulic-clamping-conversion-kit', img: './src/assets/menu-drop-down/screening/hydraulic-clamp-kit.png' },
                ],
                resources: [
                    { title: 'Screen Accessories Maintenance', link: '/blog/screen-accessories-maintenance', img: './src/assets/menu-drop-down/general-lab/screening-accessories-video.avif' },
                    { title: 'Screen Cleaning Techniques', link: 'https://www.youtube.com/watch?v=example3', img: './src/assets/menu-drop-down/general-lab/screening-brushes-video.avif', isVideo: true },
                    { title: 'Accessory Setup Guide', link: '/blog/screen-accessory-setup', img: './src/assets/menu-drop-down/general-lab/clean-n-weigh-video.avif' }
                ]
            }
        }
    },
    'sample-splitting': {
        tabs: [
            { id: 'splitters', label: 'Sample Splitters', isActive: true },
            { id: 'accessories', label: 'Splitting Accessories', isActive: false },
        ],
        content: {
            'splitters': {
                categories: [
                    { name: 'Universal Sample Splitters', link: '/universal-sample-splitters', img: './src/assets/menu-drop-down/sample-splitting/sample-splitters.avif' },
                    { name: 'Universal Mini-Splitters', link: '/universal-mini-splitters', img: './src/assets/menu-drop-down/sample-splitting/mini-sample-splitters.avif' },
                    { name: 'Fixed Chute Splitter', link: '/fixed-chute-splitter', img: './src/assets/menu-drop-down/sample-splitting/fixed-chute-splitter.avif' },
                    { name: 'Quartermaster Asphalt Sample Divider', link: '/quartermaster-asphalt-sample-divider', img: './src/assets/menu-drop-down/asphalt/quartermaster.avif' },
                    { name: 'California Fixed Chute Sample Splitter', link: '/california-fixed-chute-sample-splitter', img: './src/assets/menu-drop-down/sample-splitting/california-splitter.avif' },
                    { name: 'Spinning Rifflers / Rotary Sample Divider', link: '/spinning-rifflers-rotary-sample-divider', img: './src/assets/menu-drop-down/sample-splitting/spinning-riffler.avif' },
                    { name: 'Enclosed Sample Splitters', link: '/enclosed-sample-splitters', img: './src/assets/menu-drop-down/sample-splitting/enclosed-splitter.avif' },
                    { name: '1/16 Sample Reducers', link: '/1-16-sample-reducers', img: './src/assets/menu-drop-down/sample-splitting/1-16-reducers.avif' },
                    { name: 'Riffle Splitters', link: '/riffle-splitters', img: './src/assets/menu-drop-down/sample-splitting/riffle-splitter.avif' },
                    { name: 'Laboratory Split-O-Matic Splitters', link: '/laboratory-split-o-matic-splitters', img: './src/assets/menu-drop-down/sample-splitting/lab-splitomatic.avif' },
                    { name: 'Production Split-O-Matic Splitters', link: '/production-split-o-matic-splitters', img: './src/assets/menu-drop-down/sample-splitting/production-splitomatic.avif' },
                ],
                resources: [
                    { title: 'Sample Splitting Techniques Guide', link: '/blog/sample-splitting-techniques', img: './src/assets/menu-drop-down/general-lab/selecting-splitter-blog.avif' },
                    { title: 'How to Choose the Right Sample Splitter', link: '/blog/choosing-sample-splitter', img: './src/assets/menu-drop-down/general-lab/splitting-tips-video.avif' },
                    { title: 'Sample Division Best Practices', link: 'https://www.youtube.com/watch?v=splitter-video', img: './src/assets/menu-drop-down/general-lab/reducing-sample-agg-video.avif', isVideo: true }
                ]
            },
            'accessories': {
                categories: [
                    { name: 'Sample Quartering Kit', link: '/sample-quartering-kit', img: './src/assets/menu-drop-down/sample-splitting/quartering-kit.avif' },
                    { name: 'Sampling Probes', link: '/sampling-probes', img: './src/assets/menu-drop-down/sample-splitting/sample-probes.png' },
                    { name: 'Sample Pans', link: '/sample-pans', img: './src/assets/menu-drop-down/sample-splitting/sample-pans.avif' },
                    { name: 'Core Sampling', link: '/core-sampling', img: './src/assets/menu-drop-down/asphalt/core-sampling.png' },
                ],
                resources: [
                    { title: 'Sample Splitting Techniques Guide', link: '/blog/sample-splitting-techniques', img: './src/assets/menu-drop-down/general-lab/selecting-splitter-blog.avif' },
                    { title: 'How to Choose the Right Sample Splitter', link: '/blog/choosing-sample-splitter', img: './src/assets/menu-drop-down/general-lab/splitting-tips-video.avif' },
                    { title: 'Sample Division Best Practices', link: 'https://www.youtube.com/watch?v=splitter-video', img: './src/assets/menu-drop-down/general-lab/reducing-sample-agg-video.avif', isVideo: true }
                ]
            }
        }
    },
    'aggregates': {
        tabs: [
            { id: 'all-aggregates', label: 'Aggregate Testing', isActive: true },
        ],
        content: {
            'all-aggregates': {
                categories: [
                    { name: 'Durability and Abrasion', link: '/durability-and-abrasion-testing', img: './src/assets/menu-drop-down/aggregates/durability-abrasion.avif' },
                    { name: 'Specific Gravity', link: '/specific-gravity-testing', img: './src/assets/menu-drop-down/aggregates/specific-gravity.png' },
                    { name: 'Angularity and Elongation', link: '/angularity-and-elongation-testing', img: './src/assets/menu-drop-down/aggregates/angularity.png' },
                    { name: 'Sand Equivalent Testing', link: '/sand-equivalent-testing', img: './src/assets/menu-drop-down/aggregates/sand-equivalent-set.png' },
                    { name: 'Aggregate Washers', link: '/aggregate-washers', img: './src/assets/menu-drop-down/aggregates/agg-washers.avif' },
                    { name: 'Moisture Testers', link: '/moisture-testers', img: './src/assets/menu-drop-down/aggregates/moisture-tester.png' },
                    { name: 'Organic Impurities Test Set', link: '/organic-impurities-test-set', img: './src/assets/menu-drop-down/aggregates/organic-impurities-set.avif' },
                    { name: 'Methylene Blue Test Set', link: '/methylene-blue-test-set', img: './src/assets/menu-drop-down/aggregates/methylene-blue.png' },
                    { name: 'Coal Testing', link: '/coal-testing', img: './src/assets/menu-drop-down/aggregates/coal-testing.png' },
                ],
                resources: [
                    { title: 'Complete Aggregate Testing Guide', link: '/blog/complete-aggregate-testing-guide', img: './src/assets/menu-drop-down/general-lab/fineness-agg-blog.avif' },
                    { title: 'Aggregate Quality Control Procedures', link: '/blog/aggregate-quality-control', img: './src/assets/menu-drop-down/general-lab/characteristics-agg-video.avif' },
                    { title: 'Field Testing Techniques Video', link: 'https://www.youtube.com/watch?v=aggregate-field-testing', img: './src/assets/menu-drop-down/general-lab/manual-agg-video.avif', isVideo: true }
                ]
            }
        }
    },
    'asphalt': {
        tabs: [
            { id: 'mix-design', label: 'Mix Design', isActive: true },
            { id: 'binder-testing', label: 'Asphalt Binder Testing', isActive: false },
            { id: 'pavement-quality', label: 'Pavement Quality Testing', isActive: false },
        ],
        content: {
            'mix-design': {
                categories: [
                    { name: 'Marshall Testing', link: '/marshall-testing', img: './src/assets/menu-drop-down/asphalt/marshall.png' },
                    { name: 'Specific Gravity', link: '/asphalt-specific-gravity', img: './src/assets/menu-drop-down/aggregates/specific-gravity.png' },
                    { name: 'Asphalt Content Furnaces', link: '/asphalt-content-furnaces', img: './src/assets/menu-drop-down/asphalt/content-furnace.avif' },
                    { name: 'Quartermaster Asphalt Sample Divider', link: '/quartermaster-asphalt-sample-divider', img: './src/assets/menu-drop-down/asphalt/quartermaster.avif' },
                    { name: 'Extraction Testing', link: '/extraction-testing', img: './src/assets/menu-drop-down/asphalt/extraction.avif' },
                    { name: 'Wheel Trackers', link: '/wheel-trackers', img: './src/assets/menu-drop-down/asphalt/wheel-tracker.avif' },
                    { name: 'Superpave Oven', link: '/superpave-oven', img: './src/assets/menu-drop-down/asphalt/superpave-oven.png' },
                    { name: 'Superpave Gyratory Compactors', link: '/superpave-gyratory-compactors', img: './src/assets/menu-drop-down/asphalt/gyratory-compactor.png' },
                    { name: 'Asphalt Mixers', link: '/asphalt-mixers', img: './src/assets/menu-drop-down/asphalt/lab-mixers.avif' },
                    { name: 'Draindown Basket', link: '/draindown-basket', img: './src/assets/menu-drop-down/asphalt/draindown-basket.png' },
                    { name: 'Hveem Testing Machine', link: '/hveem-testing-machine', img: './src/assets/menu-drop-down/asphalt/hveem.png' },
                    { name: 'Specimen Measurement', link: '/specimen-measurement', img: './src/assets/menu-drop-down/sieve/sieve-inspections-tools/digital-calipers.png' },
                ],
                resources: [
                    { title: 'Marshall Mix Design Guide', link: '/blog/marshall-mix-design', img: './src/assets/menu-drop-down/general-lab/marshall-blog.avif' },
                    { title: 'Superpave Mix Design Procedures', link: '/blog/superpave-mix-design', img: './src/assets/menu-drop-down/general-lab/asphalt-sg-blog.avif' },
                    { title: 'Asphalt Content Testing Video', link: 'https://www.youtube.com/watch?v=asphalt-content-video', img: './src/assets/menu-drop-down/general-lab/marshall-setup-video.avif', isVideo: true }
                ]
            },
            'binder-testing': {
                categories: [
                    { name: 'Rolling Thin Film Ovens (RTFO)', link: '/rolling-thin-film-ovens', img: './src/assets/menu-drop-down/asphalt/rtfo.avif' },
                    { name: 'Dynamic Shear Rheometers (DSR)', link: '/dynamic-shear-rheometers', img: './src/assets/menu-drop-down/asphalt/dsr.png' },
                    { name: 'Viscosity Testing', link: '/viscosity-testing', img: './src/assets/menu-drop-down/asphalt/viscosity.png' },
                    { name: 'Bending Beam Rheometers (BBR)', link: '/bending-beam-rheometers', img: './src/assets/menu-drop-down/asphalt/bbr.png' },
                    { name: 'Pressure Aging Vessel (PAV)', link: '/pressure-aging-vessel', img: './src/assets/menu-drop-down/asphalt/pav.png' },
                    { name: 'Vacuum Degassing Oven (VDO)', link: '/vacuum-degassing-oven', img: './src/assets/menu-drop-down/asphalt/vdo.png' },
                    { name: 'Universal Penetrometers', link: '/universal-penetrometers', img: './src/assets/menu-drop-down/asphalt/universal-penetrometers.png' },
                    { name: 'Flash Point Testers', link: '/flash-point-testers', img: './src/assets/menu-drop-down/asphalt/flashpoint-testers.png' },
                    { name: 'Softening Point Apparatus', link: '/softening-point-apparatus', img: './src/assets/menu-drop-down/asphalt/softening-point.avif' },
                    { name: 'Melting Pots', link: '/asphalt-melting-pots', img: './src/assets/menu-drop-down/asphalt/asphalt-melting-pots.avif' },
                    { name: 'Ductility Tester', link: '/ductility-tester', img: './src/assets/menu-drop-down/asphalt/ductility-tester.avif' },
                    { name: 'Pyrolytic Oven', link: '/pyrolytic-oven', img: './src/assets/menu-drop-down/asphalt/pyrolytic-oven.avif' },
                ],
                resources: [
                    { title: 'Binder Testing Standards', link: '/blog/binder-testing-standards', img: './src/assets/menu-drop-down/general-lab/rtfo-blog.avif' },
                    { title: 'Rheology Testing Guide', link: '/blog/rheology-testing-guide', img: './src/assets/menu-drop-down/general-lab/pav-blog.avif' },
                    { title: 'Aging Test Procedures Video', link: 'https://www.youtube.com/watch?v=aging-test-video', img: './src/assets/menu-drop-down/general-lab/bbr-video.avif', isVideo: true }
                ]
            },
            'pavement-quality': {
                categories: [
                    { name: 'Coring and Sawing', link: '/coring-and-sawing', img: './src/assets/menu-drop-down/asphalt/core-sampling.png' },
                    { name: 'NCAT Asphalt Field Permeameter', link: '/ncat-asphalt-field-permeameter', img: './src/assets/menu-drop-down/asphalt/ncat-field-permeameter.png' },
                    { name: 'Asphalt Lab Permeameters', link: '/asphalt-lab-permeameters', img: './src/assets/menu-drop-down/asphalt/lab-permeameter.png' },
                    { name: 'Digital IR Thermometers & Thermal Imaging Cameras', link: '/thermal-imaging-cameras', img: './src/assets/menu-drop-down/asphalt/thermal-imaging-cameras.png' },
                    { name: 'Asphalt Depth Gauge', link: '/asphalt-depth-gauge', img: './src/assets/menu-drop-down/asphalt/asphalt-depth-gauge.png' },
                    { name: 'Benkelman Beam', link: '/benkelman-beam', img: './src/assets/menu-drop-down/asphalt/benkelman-beam.png' },
                    { name: 'Digital Calipers', link: '/asphalt-digital-calipers', img: './src/assets/menu-drop-down/sieve/sieve-inspections-tools/digital-calipers.png' },
                ],
                resources: [
                    { title: 'Pavement Quality Assessment', link: '/blog/pavement-quality-assessment', img: './src/assets/menu-drop-down/general-lab/asphalt-tech-blog.avif' },
                    { title: 'Field Permeability Testing', link: '/blog/field-permeability-testing', img: './src/assets/menu-drop-down/general-lab/flir-cameras-video.avif' },
                    { title: 'Thermal Imaging Applications Video', link: 'https://www.youtube.com/watch?v=thermal-imaging-video', img: './src/assets/menu-drop-down/general-lab/ncat-perm-video.avif', isVideo: true }
                ]
            }
        }
    },
    'concrete': {
        tabs: [
            { id: 'fresh-concrete', label: 'Fresh Concrete Testing', isActive: true },
            { id: 'sample-molds', label: 'Concrete Sample Molds', isActive: false },
            { id: 'curing', label: 'Curing', isActive: false },
            { id: 'strength-testing', label: 'Strength Testing', isActive: false },
            { id: 'non-destructive', label: 'Non-Destructive Testing', isActive: false },
            { id: 'coring-sawing', label: 'Coring and Sawing', isActive: false },
            { id: 'mixing', label: 'Mixing', isActive: false },
            { id: 'cement-testing', label: 'Cement Testing', isActive: false },
        ],
        content: {
            'fresh-concrete': {
                categories: [
                    { name: 'Slump Testing', link: '/slump-testing', img: './src/assets/menu-drop-down/concrete-cement/slump.png' },
                    { name: 'Concrete Air Meters', link: '/concrete-air-meters', img: './src/assets/menu-drop-down/concrete-cement/concrete-air-meters.png' },
                    { name: 'Unit Weight (Density)', link: '/unit-weight-density', img: './src/assets/menu-drop-down/concrete-cement/unit-weight.avif' },
                    { name: 'Self-Consolidating Concrete (SCC)', link: '/self-consolidating-concrete', img: './src/assets/menu-drop-down/concrete-cement/scc.avif' },
                    { name: 'Concrete Consolidation', link: '/concrete-consolidation', img: './src/assets/menu-drop-down/concrete-cement/concrete-consolidation.png' },
                    { name: 'Concrete Penetrometers', link: '/concrete-penetrometers', img: './src/assets/menu-drop-down/concrete-cement/concrete-penetrometers.avif' },
                    { name: 'Fresh Testing Accessories', link: '/fresh-testing-accessories', img: './src/assets/menu-drop-down/concrete-cement/fresh-testing-accessories.avif' },
                ],
                resources: [
                    { title: 'Fresh Concrete Testing Guide', link: '/blog/fresh-concrete-testing', img: './src/assets/menu-drop-down/general-lab/fresh-concrete-blog.avif' },
                    { title: 'Air Content Testing Procedures', link: '/blog/air-content-testing', img: './src/assets/menu-drop-down/general-lab/air-content-blog.avif' },
                    { title: 'Slump Test Video Demonstration', link: 'https://www.youtube.com/watch?v=slump-test-video', img: './src/assets/menu-drop-down/general-lab/air-meter-calibration-video.avif', isVideo: true }
                ]
            },
            'sample-molds': {
                categories: [
                    { name: 'Concrete Cylinder Molds', link: '/concrete-cylinder-molds', img: './src/assets/menu-drop-down/concrete-cement/concrete-cylinder-molds.avif' },
                    { name: 'Concrete Beam Molds', link: '/concrete-beam-molds', img: './src/assets/menu-drop-down/concrete-cement/beam-mold.avif' },
                    { name: 'Concrete Cube Molds', link: '/concrete-cube-molds', img: './src/assets/menu-drop-down/concrete-cement/concrete-cube-molds.avif' },
                    { name: 'Sample Mold Accessories', link: '/sample-mold-accessories', img: './src/assets/menu-drop-down/concrete-cement/concrete-mold-accessories.avif' },
                ],
                resources: [
                    { title: '4 Important Steps to Reliable Concrete Test Cylinder Test', link: 'blog/four-important-steps-to-reliable-concrete-samples', img: './src/assets/menu-drop-down/general-lab/fresh-concrete-blog.avif' },
                    { title: `Gilson's Single-Use Plastic Concrete Cylinder Molds`, link: 'https://www.youtube.com/watch?v=vCQ7PLsJdpE', img: './src/assets/menu-drop-down/general-lab/air-content-blog.avif' },
                    { title: `Gilson's Steel Concrete Beam Models`, link: 'https://www.youtube.com/watch?v=-eMQnpfLqus', img: './src/assets/menu-drop-down/general-lab/air-meter-calibration-video.avif' }
                ]
            },
            'curing': {
                categories: [
                    { name: 'Curing Boxes', link: '/curing-boxes', img: './src/assets/menu-drop-down/concrete-cement/curing-boxes.avif' },
                    { name: 'Curing Tanks', link: '/curing-tanks', img: './src/assets/menu-drop-down/concrete-cement/curing-tanks.avif' },
                    { name: 'Field Curing Chest', link: '/field-curing-chest', img: './src/assets/menu-drop-down/concrete-cement/Field-curing-chest.avif' },
                    { name: 'Aquafog® GT 500 Fogging Fans', link: '/aquafog-fogging-fans', img: './src/assets/menu-drop-down/concrete-cement/fogging-fan.avif' },
                    { name: 'Moisture Room Control Panel', link: '/moisture-room-control-panel', img: './src/assets/menu-drop-down/concrete-cement/moisture-control-panel.avif' },
                    { name: 'Curing Tank Heater', link: '/curing-tank-heater', img: './src/assets/menu-drop-down/concrete-cement/curing-tank-heater.avif' },
                    { name: 'Curing Tank Circulator', link: '/curing-tank-circulator', img: './src/assets/menu-drop-down/concrete-cement/curing-tank-circulator.avif' },
                    { name: 'Heater/Circulator', link: '/heater-circulator', img: './src/assets/menu-drop-down/concrete-cement/heater-circulator.png' },
                    { name: 'Concrete Cylinder Transport Racks', link: '/concrete-cylinder-transport-racks', img: './src/assets/menu-drop-down/concrete-cement/cylinder-transport-racks.png' },
                    { name: 'Moist Cabinet', link: '/moist-cabinet', img: './src/assets/menu-drop-down/concrete-cement/moist-cabinet.avif' },
                    { name: 'Humidity Meters', link: '/humidity-meters', img: './src/assets/menu-drop-down/concrete-cement/humidity-meters.png' },
                    { name: 'Registering Max/Min Thermometers', link: '/registering-max-min-thermometers', img: './src/assets/menu-drop-down/concrete-cement/max-min-registering-thermometers.avif' },
                ],
                resources: [
                    { title: 'Concrete Curing Best Practices', link: '/blog/concrete-curing-best-practices', img: './src/assets/menu-drop-down/general-lab/curing-blog.avif' },
                    { title: 'Moisture Room Control Guide', link: '/blog/moisture-room-control', img: './src/assets/menu-drop-down/general-lab/reliable-test-cylinders-blog.avif' },
                    { title: 'Curing Procedures Video', link: 'https://www.youtube.com/watch?v=curing-video', img: './src/assets/menu-drop-down/general-lab/concrete-video.avif', isVideo: true }
                ]
            },
            'strength-testing': {
                categories: [
                    { name: 'Compression Machines', link: '/compression-machines', img: './src/assets/menu-drop-down/concrete-cement/compression-machines.png' },
                    { name: 'Compression Machines Accessories', link: '/compression-machine-accessories', img: './src/assets/menu-drop-down/concrete-cement/compression-machine-accessories.avif' },
                    { name: 'Capping Pads and Retainers', link: '/capping-pads-and-retainers', img: './src/assets/menu-drop-down/concrete-cement/pads-retainers.avif' },
                    { name: 'Capping Compound', link: '/capping-compound', img: './src/assets/menu-drop-down/concrete-cement/capping-compound.avif' },
                    { name: 'Vertical Cylinder Cappers', link: '/vertical-cylinder-cappers', img: './src/assets/menu-drop-down/concrete-cement/vertical-cylinder-cappers.avif' },
                    { name: 'Melting Pots', link: '/concrete-melting-pots', img: './src/assets/menu-drop-down/concrete-cement/melting-pots.avif' },
                    { name: 'Portable Concrete Beam Tester', link: '/portable-concrete-beam-tester', img: './src/assets/menu-drop-down/concrete-cement/beam-tester.png' },
                    { name: 'Concrete Cylinder End Grinders', link: '/concrete-cylinder-end-grinders', img: './src/assets/menu-drop-down/concrete-cement/end-grinder.avif' },
                    { name: 'Masonry Block Caps', link: '/masonry-block-caps', img: './src/assets/menu-drop-down/concrete-cement/masonry-block-cap.avif' },
                    { name: 'Specimen Measurement', link: '/specimen-measurement', img: './src/assets/menu-drop-down/sieve/sieve-inspections-tools/digital-calipers.png' },
                ],
                resources: [
                    { title: 'Compression Testing Guide', link: '/blog/compression-testing-guide', img: './src/assets/menu-drop-down/general-lab/selection-compression-machine-blog.avif' },
                    { title: 'Capping Procedures and Standards', link: '/blog/capping-procedures', img: './src/assets/menu-drop-down/general-lab/capping-pads-blog.avif' },
                    { title: 'Beam Testing Video Guide', link: 'https://www.youtube.com/watch?v=beam-testing-video', img: './src/assets/menu-drop-down/general-lab/compression-machine-video.avif', isVideo: true }
                ]
            },
            'non-destructive': {
                categories: [
                    { name: 'Concrete Test Hammers', link: '/concrete-test-hammers', img: './src/assets/menu-drop-down/concrete-cement/test-hammers.png' },
                    { name: 'Crack Monitors', link: '/crack-monitors', img: './src/assets/menu-drop-down/concrete-cement/crack-monitors.avif' },
                    { name: 'Maturity Testing', link: '/maturity-testing', img: './src/assets/menu-drop-down/concrete-cement/maturity.png' },
                    { name: 'Rebar Locators and Cover Meters', link: '/rebar-locators-cover-meters', img: './src/assets/menu-drop-down/concrete-cement/rebar-locators.avif' },
                    { name: 'Corrosion Measurement', link: '/corrosion-measurement', img: './src/assets/menu-drop-down/concrete-cement/corrosion-measurement.png' },
                    { name: 'Ultrasonic Pulse Velocity (UPV) Testers', link: '/ultrasonic-pulse-velocity-testers', img: './src/assets/menu-drop-down/concrete-cement/upv.png' },
                    { name: 'Pull-Off Adhesion Tester', link: '/pull-off-adhesion-tester', img: './src/assets/menu-drop-down/concrete-cement/pull-off-tester.avif' },
                    { name: 'Ground Penetrating Radar (GPR) Scanner', link: '/ground-penetrating-radar-scanner', img: './src/assets/menu-drop-down/concrete-cement/gpr.png' },
                    { name: 'Concrete Resonant Frequency', link: '/concrete-resonant-frequency', img: './src/assets/menu-drop-down/concrete-cement/concrete-resonant-frequency.png' },
                    { name: 'Rapid Chloride Permeability Tester', link: '/rapid-chloride-permeability-tester', img: './src/assets/menu-drop-down/concrete-cement/rapid-chloride-tester.avif' },
                    { name: 'Coefficient of Thermal Expansion', link: '/coefficient-of-thermal-expansion', img: './src/assets/menu-drop-down/concrete-cement/coefficient-thermal-expansion.png' },
                    { name: 'ASR Detection Kit', link: '/asr-detection-kit', img: './src/assets/menu-drop-down/concrete-cement/asr-detect-set.png' },
                    { name: 'Moisture Testing', link: '/concrete-moisture-testing', img: './src/assets/menu-drop-down/concrete-cement/moisture-testing.avif' },
                    { name: 'Windsor Probe Testers', link: '/windsor-probe-testers', img: './src/assets/menu-drop-down/concrete-cement/windsor-probe.png' },
                    { name: 'Strain Gauge Set', link: '/strain-gauge-set', img: './src/assets/menu-drop-down/concrete-cement/strain-gauge.png' },
                ],
                resources: [
                    { title: 'Non-Destructive Testing Methods', link: '/blog/non-destructive-testing-methods', img: './src/assets/menu-drop-down/general-lab/non-destructive-blog.avif' },
                    { title: 'UPV Testing Guide', link: '/blog/upv-testing-guide', img: './src/assets/menu-drop-down/general-lab/rebound-hammer-blog.avif' },
                    { title: 'GPR Scanning Video', link: 'https://www.youtube.com/watch?v=gpr-scanning-video', img: './src/assets/menu-drop-down/general-lab/concrete-cracking-blog.avif', isVideo: true }
                ]
            },
            'coring-sawing': {
                categories: [
                    { name: 'Gas-Powered Core Drill', link: '/gas-powered-core-drill', img: './src/assets/menu-drop-down/concrete-cement/gas-power-core-drill.png' },
                    { name: 'Electric Core Drill', link: '/electric-core-drill', img: './src/assets/menu-drop-down/concrete-cement/electric-coring-drill.png' },
                    { name: 'Diamond Core Bits', link: '/diamond-core-bits', img: './src/assets/menu-drop-down/concrete-cement/core-bit-expander.avif' },
                    { name: 'Core Bit Expander Sets', link: '/core-bit-expander-sets', img: './src/assets/menu-drop-down/concrete-cement/core-bit-expander.avif' },
                    { name: 'Core Retrieval', link: '/core-retrieval', img: './src/assets/menu-drop-down/concrete-cement/coring-retrieval.png' },
                    { name: 'Pressurized Water Tank', link: '/pressurized-water-tank', img: './src/assets/menu-drop-down/concrete-cement/pressurized-water-tank.png' },
                    { name: 'Core Bit Strap Wrench', link: '/core-bit-strap-wrench', img: './src/assets/menu-drop-down/concrete-cement/bit-strap-wrench.png' },
                    { name: 'Water Circulator', link: '/water-circulator', img: './src/assets/menu-drop-down/concrete-cement/water-circulator.png' },
                    { name: 'Masonry Saws', link: '/masonry-saws', img: './src/assets/menu-drop-down/concrete-cement/masonry-saws.png' },
                ],
                resources: [
                    { title: 'Concrete Coring Guide', link: '/blog/concrete-coring-guide', img: './src/assets/menu-drop-down/general-lab/certification-video.avif' },
                    { title: 'Core Bit Selection and Maintenance', link: '/blog/core-bit-selection', img: './src/assets/menu-drop-down/general-lab/extractors-video.avif' },
                    { title: 'Core Drilling Video Tutorial', link: 'https://www.youtube.com/watch?v=core-drilling-video', img: './src/assets/menu-drop-down/general-lab/sawing-video.avif', isVideo: true }
                ]
            },
            'mixing': {
                categories: [
                    { name: '5qt. Benchtop Lab Mixer', link: '/5qt-benchtop-lab-mixer', img: './src/assets/menu-drop-down/concrete-cement/5qt-lab-mixer.avif' },
                    { name: '12qt. Benchtop Lab Mixer', link: '/12qt-benchtop-lab-mixer', img: './src/assets/menu-drop-down/concrete-cement/12qt-lab-mixer.avif' },
                    { name: 'Light-Duty Stationary Mixer', link: '/light-duty-stationary-mixer', img: './src/assets/menu-drop-down/concrete-cement/light-duty-mixer.png' },
                    { name: 'Heavy-Duty Portable Mixers', link: '/heavy-duty-portable-mixers', img: './src/assets/menu-drop-down/concrete-cement/heavy-duty-mixer.png' },
                    { name: 'Portable Concrete Mixers', link: '/portable-concrete-mixers', img: './src/assets/menu-drop-down/concrete-cement/concrete-mixer.png' },
                ],
                resources: [
                    { title: 'Why Complete Testing of Fresh Concrete Matters', link: '/blog/concrete-mixing-procedures', img: './src/assets/menu-drop-down/general-lab/cement-testing-blog.avif' },
                    { title: 'Setting Up a CMT Field Lab: What Equipment is Needed', link: '/blog/lab-mixer-selection', img: './src/assets/menu-drop-down/general-lab/concrete-blog.avif' },
                    { title: 'Sample Material Handling Scoops', link: '/blog/lab-mixer-selection', img: './src/assets/menu-drop-down/general-lab/scoops-video.avif' }
                ]
            },
            'cement-testing': {
                categories: [
                    { name: 'Cube Molds', link: '/cement-cube-molds', img: './src/assets/menu-drop-down/concrete-cement/cement-cube-molds.png' },
                    { name: 'Prism Molds', link: '/prism-molds', img: './src/assets/menu-drop-down/concrete-cement/prism-molds.avif' },
                    { name: 'Grout Sample Box', link: '/grout-sample-box', img: './src/assets/menu-drop-down/concrete-cement/grout-sample-box.png' },
                    { name: 'Length Change Testing', link: '/length-change-testing', img: './src/assets/menu-drop-down/concrete-cement/length-change-test.avif' },
                    { name: 'Flow Tables', link: '/flow-tables', img: './src/assets/menu-drop-down/concrete-cement/flow-tables.png' },
                    { name: 'Vicat Apparatus', link: '/vicat-apparatus', img: './src/assets/menu-drop-down/concrete-cement/vicat-apparatus.png' },
                    { name: 'Mortar Penetrometers', link: '/mortar-penetrometers', img: './src/assets/menu-drop-down/concrete-cement/mortar-penetrometers.png' },
                    { name: 'Gillmore Needle Apparatus', link: '/gillmore-needle-apparatus', img: './src/assets/menu-drop-down/concrete-cement/gillmore.png' },
                    { name: 'Grout Flow Cone Sets', link: '/grout-flow-cone-sets', img: './src/assets/menu-drop-down/concrete-cement/grout-flow-cones.png' },
                    { name: 'Grout Prism Capping Stand', link: '/grout-prism-capping-stand', img: './src/assets/menu-drop-down/concrete-cement/grout-prism-capping-stand.png' },
                    { name: 'Masonry Grout Window', link: '/masonry-grout-window', img: './src/assets/menu-drop-down/concrete-cement/grout-window.avif' },
                    { name: 'Le Chatelier Flask', link: '/le-chatelier-flask', img: './src/assets/menu-drop-down/concrete-cement/le-chatelier.png' },
                    { name: 'Fineness of Cement', link: '/fineness-of-cement', img: './src/assets/menu-drop-down/concrete-cement/fineness-of-cement.png' },
                    { name: 'ASTM Test Sand', link: '/astm-test-sand', img: './src/assets/menu-drop-down/concrete-cement/test-sand.avif' },
                    { name: 'Strain Gauge Set', link: '/cement-strain-gauge-set', img: './src/assets/menu-drop-down/concrete-cement/strain-gauge.png' },
                ],
                resources: [
                    { title: 'Cement Testing Standards', link: '/blog/cement-testing-standards', img: './src/assets/menu-drop-down/general-lab/cement-testing-blog.avif' },
                    { title: 'Vicat Test Procedures', link: '/blog/vicat-test-procedures', img: './src/assets/menu-drop-down/general-lab/grout-flow-cone-video.avif' },
                    { title: 'Cement Fineness Testing Video', link: 'https://www.youtube.com/watch?v=cement-fineness-video', img: './src/assets/menu-drop-down/general-lab/concrete-video.avif', isVideo: true }
                ]
            }
        }
    },
    'soils': {
        tabs: [
            { id: 'all-soils', label: 'Soil Testing', isActive: true },
        ],
        content: {
            'all-soils': {
                categories: [
                    { name: 'Proctor / Density', link: '/proctor-density', img: './src/assets/menu-drop-down/solis/proctor-1.png' },
                    { name: 'California Bearing Ratio (CBR)', link: '/california-bearing-ratio', img: './src/assets/menu-drop-down/solis/cbr.png' },
                    { name: 'Consolidation', link: '/soil-consolidation', img: './src/assets/menu-drop-down/solis/soil-consolidation.png' },
                    { name: 'Atterberg Limits', link: '/atterberg-limits', img: './src/assets/menu-drop-down/solis/atterberg.png' },
                    { name: 'Triaxial Shear Strength', link: '/triaxial-shear-strength', img: './src/assets/menu-drop-down/solis/triaxial.avif' },
                    { name: 'Soil Sampling', link: '/soil-sampling', img: './src/assets/menu-drop-down/solis/soil-sampling.png' },
                    { name: 'Unconfined Compressive Strength', link: '/unconfined-compressive-strength', img: './src/assets/menu-drop-down/solis/ucs.png' },
                    { name: 'Permeability', link: '/soil-permeability', img: './src/assets/menu-drop-down/solis/permeability.png' },
                    { name: 'Direct Shear Strength', link: '/direct-shear-strength', img: './src/assets/menu-drop-down/solis/direct-shear.png' },
                    { name: 'Field Testing / Classification', link: '/field-testing-classification', img: './src/assets/menu-drop-down/solis/soil-field.png' },
                    { name: 'Hydrometer Analysis', link: '/hydrometer-analysis', img: './src/assets/menu-drop-down/solis/hydrometer-analysis.png' },
                    { name: 'Specific Gravity', link: '/soil-specific-gravity', img: './src/assets/menu-drop-down/solis/soil-specific-gravity.png' },
                    { name: 'Soil-Cement', link: '/soil-cement', img: './src/assets/menu-drop-down/solis/cement1.jpg' },
                    { name: 'Load Frames', link: '/load-frames', img: './src/assets/menu-drop-down/solis/load-frames.png' },
                ],
                resources: [
                    { title: 'Atterberg Limits: A Quick Reference Guide', link: '/blog/complete-soil-testing-guide', img: './src/assets/menu-drop-down/general-lab/atterberg-blog.avif' },
                    { title: 'Proctor Compaction Test: A Basic Guide', link: '/blog/soil-mechanics-fundamentals', img: './src/assets/menu-drop-down/general-lab/proctor-blog.avif' },
                    { title: 'Soily Density: Pros and Cons of the Test Methods', link: 'https://www.youtube.com/watch?v=field-testing-video', img: './src/assets/menu-drop-down/general-lab/soil-density-video.avif', isVideo: true }
                ]
            }
        }
    },
    'general-lab': {
        tabs: [
            { id: 'all-general-lab', label: 'General Lab', isActive: true },
        ],
        content: {
            'all-general-lab': {
                categories: [
                    { name: 'Ovens and Furnaces', link: '/ovens-and-furnaces', img: './src/assets/menu-drop-down/general-lab/ovens-furnaces.avif' },
                    { name: 'Crushers, Pulverizers & Mills', link: '/crushers-pulverizers-mills', img: './src/assets/menu-drop-down/general-lab/crushers-pulverizers-mills.avif' },
                    { name: 'Temperature and Humidity', link: '/temperature-and-humidity', img: './src/assets/menu-drop-down/general-lab/temperature-humidity.png' },
                    { name: 'Scales and Balances', link: '/scales-and-balances', img: './src/assets/menu-drop-down/general-lab/scales-balances.png' },
                    { name: 'Lab Tools and Supplies', link: '/lab-tools-and-supplies', img: './src/assets/menu-drop-down/general-lab/lab-supplies.png' },
                    { name: 'Lab Safety', link: '/lab-safety', img: './src/assets/menu-drop-down/general-lab/lab-safety.avif' },
                    { name: 'Lab Utensils and Hand Tools', link: '/lab-utensils-and-hand-tools', img: './src/assets/menu-drop-down/general-lab/lab-utensils.png' },
                    { name: 'Sample Containers and Bags', link: '/sample-containers-and-bags', img: './src/assets/menu-drop-down/general-lab/sample-containers.avif' },
                    { name: 'Sample Pans, Dishes, and Bowls', link: '/sample-pans-dishes-and-bowls', img: './src/assets/menu-drop-down/general-lab/pans-dishes-bowls.avif' },
                    { name: 'Timers & Stopwatches', link: '/timers-and-stopwatches', img: './src/assets/menu-drop-down/general-lab/timers-stopwatches.avif' },
                    { name: 'Reference Books and Materials', link: '/reference-books-and-materials', img: './src/assets/menu-drop-down/general-lab/books.avif' },
                    { name: 'Hot Plates, Ranges, and Lab Burners', link: '/hot-plates-ranges-lab-burners', img: './src/assets/menu-drop-down/general-lab/heating.avif' },
                    { name: 'Laboratory Mixers', link: '/laboratory-mixers', img: './src/assets/menu-drop-down/asphalt/lab-mixers.avif' },
                ],
                resources: [
                    { title: 'How To Set Up a Field Lab for Construction Materials Testing', link: '/blog/complete-laboratory-setup-guide', img: './src/assets/menu-drop-down/general-lab/setting-up-lab.avif' },
                    { title: `6 Do's & Donn'ts for Rejoining Separated Therometers`, link: '/blog/lab-equipment-selection-guide', img: './src/assets/menu-drop-down/general-lab/rejoining-thermometer-blog.avif' },
                    { title: 'Choosing the Right Lab Oven', link: 'https://www.youtube.com/watch?v=lab-organization-safety-video', img: './src/assets/menu-drop-down/general-lab/selecting-oven-blog.avif', isVideo: true }
                ]
            }
        }
    }
};

window.menuData = menuData;
console.log('menuData has been set to window object');