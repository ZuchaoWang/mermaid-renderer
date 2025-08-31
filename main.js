// 初始化Mermaid
mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    fontFamily: 'Segoe UI, Microsoft YaHei, sans-serif',
    fontSize: 16
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
    
    // 如果没有代码，清空图表
    if (!code.trim()) {
        chartElement.innerHTML = '<div style="color: #666; padding: 20px; text-align: center;">请输入Mermaid代码后点击生成图表</div>';
        return;
    }
    
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

// 初始化显示默认消息
renderChart();
