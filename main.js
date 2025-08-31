// 初始化Mermaid
mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    fontFamily: 'Segoe UI, Microsoft YaHei, sans-serif',
    fontSize: 14
});

// 加载示例代码函数
function loadExample() {
    fetch('./example.mmd')
        .then(function(response) {
            if (!response.ok) {
                throw new Error('无法加载文件');
            }
            return response.text();
        })
        .then(function(exampleCode) {
            document.getElementById('mermaid-code').value = exampleCode;
            renderChart();
        })
        .catch(function(error) {
            console.error('无法加载示例代码:', error);
            alert('无法加载示例代码，请检查文件是否存在。');
        });
}

// 渲染图表函数
function renderChart() {
    const code = document.getElementById('mermaid-code').value;
    const chartElement = document.getElementById('mermaid-chart');
    
    // 如果没有代码，清空图表但不显示错误
    if (!code.trim()) {
        chartElement.innerHTML = '';
        chartElement.className = ''; // 移除mermaid类
        return;
    }
    
    // 清除现有图表
    chartElement.removeAttribute('data-processed');
    chartElement.className = 'mermaid'; // 添加mermaid类
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
    const code = document.getElementById('mermaid-code').value;
    if (code.trim()) {
        renderChart();
    }
});
