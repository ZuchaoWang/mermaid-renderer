// 初始化Mermaid
mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    fontFamily: 'Segoe UI, Microsoft YaHei, sans-serif',
    fontSize: 16
});

// 初始渲染示例图表
renderChart();

// 渲染图表函数
function renderChart() {
    const code = document.getElementById('mermaid-code').value;
    const chartElement = document.getElementById('mermaid-chart');
    
    // 清除现有图表
    chartElement.removeAttribute('data-processed');
    chartElement.innerHTML = code;
    
    // 重新渲染
    try {
        mermaid.init(undefined, '#mermaid-chart');
    } catch (error) {
        chartElement.innerHTML = '<div style="color: red; padding: 20px; text-align: center;">' +
                                 '图表渲染错误: ' + error.message + '</div>';
    }
}

// 监听窗口大小变化，重新渲染图表以适应新尺寸
window.addEventListener('resize', function() {
    renderChart();
});
