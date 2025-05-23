<script setup>
import { ref, onMounted, computed } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const props = defineProps({
    commodityDistributionData: Array,
    res: Object
});

const chartRef = ref(null);

const processedChartData = computed(() => {
    const labels = [...new Set(props.commodityDistributionData.map(item => item.commodity))];

    // Required quantities
    const requiredData = labels.map(label => {
        return props.commodityDistributionData.filter(item => item.commodity === label)
            .reduce((acc, item) => acc + item.required, 0).toFixed(2);
    });

    // Distributed quantities
    const distributedData = labels.map(label => {
        return props.commodityDistributionData.filter(item => item.commodity === label)
            .reduce((acc, item) => acc + item.distributed, 0).toFixed(2);
    });

    return {
        labels,
        datasets: [
            {
                label: 'Required',
                data: requiredData,
                backgroundColor: '#7ab8da',  // Light blue
                stack: 'Stack 0'
            },
            {
                label: 'Distributed',
                data: distributedData,
                backgroundColor: '#248cd6',  // Dark blue
                stack: 'Stack 0'
            }
        ]
    };
});

onMounted(() => {
    const ctx = chartRef.value.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: processedChartData.value,
        options: {
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    beginAtZero: true
                }
            },
            responsive: true,
            animation: false, // Disable animation
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
                title: {
                    display: true,
                    text: 'Required Vs Distributed (MT)',
                    font: {
                        size: 16
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                datalabels: {
          display: false, // Completely hide datalabels
        },

            },
            maintainAspectRatio: false
        }
    });
});
</script>

<template>
    <!-- Increased canvas size via inline styling -->
    <canvas ref="chartRef" style="width: 100%; height: 400px;"></canvas>
</template>

<style scoped>
canvas {
    max-width: 100%;
    height: auto !important;
    /* Ensures the height is respected */
}
</style>
