const PptxGenJS = require('pptxgenjs');
const pres = new PptxGenJS();
pres.layout = 'LAYOUT_16x9';

// ---------------------------------------------------------
// FRONTEND-DESIGN AESTHETICS:
// Bold minimalism, deep cyberpunk/ocean-gradient tech vibes
// ---------------------------------------------------------
const theme = {
    bg: '0A0D14',           // Very deep slate/black
    surface: '131826',      // Lighter card surface
    surfaceAlt: '1E2436',   // Mid-card tone
    cyan: '06B6D4',         // Neon Cyan
    pink: 'EC4899',         // Magenta pop
    amber: 'F59E0B',        // Warning/Insight highlight
    violet: '8B5CF6',
    white: 'F8FAFC',
    textMuted: '94A3B8',
    watermark: '111621'     // Almost invisible
};

// ========================
// Slide Masters
// ========================
pres.defineSlideMaster({
    title: 'TITLE_SLIDE',
    background: { color: theme.bg },
    objects: [
        // Giant background watermark
        { text: { text: "A I", options: { x: 5, y: -1, w: 6, h: 6, color: theme.watermark, fontSize: 340, bold: true, align: 'right', fontFace: 'Impact' } } },
        // Top right decorative lines
        { rect: { x: 7, y: 0.5, w: 2.5, h: 0.05, fill: { color: theme.cyan } } },
        { rect: { x: 9.3, y: 0.65, w: 0.2, h: 0.05, fill: { color: theme.pink } } }
    ]
});

pres.defineSlideMaster({
    title: 'CONTENT_MASTER',
    background: { color: theme.bg },
    objects: [
        // Left edge continuous premium accent stripe
        { rect: { x: 0, y: 0, w: 0.1, h: '100%', fill: { color: theme.cyan } } },
        { rect: { x: 0.1, y: 0, w: 0.02, h: '100%', fill: { color: theme.pink }, transparency: 50 } },
        // Bottom subtle footer
        { line: { x: 0.6, y: 5.3, w: 8.8, h: 0, line: { color: theme.surfaceAlt, width: 1 } } },
        { text: { text: "AURA-X-KYS // ARCHITECTURE", options: { x: 0.6, y: 5.35, w: 4, h: 0.2, color: theme.textMuted, fontSize: 8, fontFace: 'Verdana', bold: true, charSpacing: 2 } } }
    ]
});

// ========================
// SLIDE 1: Hero
// ========================
let slide = pres.addSlide({ masterName: 'TITLE_SLIDE' });
slide.addText('00', { x: 0.7, y: 1.0, w: 3, h: 1, color: theme.surfaceAlt, fontSize: 80, bold: true, fontFace: 'Trebuchet MS' });
slide.addText('解决你的重复劳动', { x: 0.6, y: 2.0, w: 8, h: 1.2, color: theme.white, fontSize: 60, bold: true, fontFace: 'Trebuchet MS' });
slide.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 3.4, w: 0.8, h: 0.08, fill: { color: theme.cyan } });
slide.addText('构建高质 AI 编程工作流 · AURA-X-KYS 架构规范', { x: 0.7, y: 3.6, w: 8, h: 0.5, color: theme.textMuted, fontSize: 16, fontFace: 'Trebuchet MS', charSpacing: 4 });

// ========================
// SLIDE 2: Timeline
// ========================
slide = pres.addSlide({ masterName: 'CONTENT_MASTER' });
slide.addText('H I S T O R Y', { x: 6.5, y: 0.5, w: 3.0, h: 1, color: theme.watermark, fontSize: 50, bold: true, align: 'right', fontFace: 'Impact' });
slide.addText('历史演进：从辅助到自主', { x: 0.6, y: 0.5, w: 8, h: 0.8, color: theme.white, fontSize: 32, bold: true, fontFace: 'Trebuchet MS' });

const stages = [
    { year: '2022', title: '轻量插件级', detail: '基于统计预测单词与单行代码', c: '#64748B' },
    { year: '2023', title: '网页外挂级', detail: 'LLM 涌现，需人工搬运代码', c: '#0EA5E9' },
    { year: '2023 Q4', title: '组件融合型', detail: '内联幽灵文本, 引入代码库片段', c: '#8B5CF6' },
    { year: '2024 初', title: 'AI原生IDE', detail: '代码库穿透, Diff直接呈现应用', c: '#10B981' },
    { year: '2024 尾', title: '自主 Agent', detail: '拆分规划及自行调试闭环', c: '#EC4899' }
];

slide.addShape(pres.shapes.LINE, { x: 1, y: 2.8, w: 8, h: 0, line: { color: theme.surfaceAlt, width: 2 } });
stages.forEach((stage, i) => {
    let xPos = 1.0 + i * 1.6;
    slide.addShape(pres.shapes.OVAL, { x: xPos, y: 2.75, w: 0.1, h: 0.1, fill: { color: stage.c.replace('#','') } });
    
    if (i % 2 === 0) {
        slide.addShape(pres.shapes.LINE, { x: xPos + 0.05, y: 1.8, w: 0, h: 0.95, line: { color: stage.c.replace('#',''), width: 1.5, dashType: 'dash' } });
        slide.addText(stage.year, { x: xPos-0.6, y: 1.2, w: 1.3, h: 0.3, color: stage.c.replace('#',''), fontSize: 16, bold: true, align: 'center', fontFace: 'Trebuchet MS' });
        slide.addText(stage.title, { x: xPos-0.75, y: 1.5, w: 1.6, h: 0.3, color: theme.white, fontSize: 14, bold: true, align: 'center' });
        slide.addText(stage.detail, { x: xPos-0.85, y: 1.8, w: 1.8, h: 0.8, color: theme.textMuted, fontSize: 11, align: 'center', valign: 'top' });
    } else {
        slide.addShape(pres.shapes.LINE, { x: xPos + 0.05, y: 2.85, w: 0, h: 0.95, line: { color: stage.c.replace('#',''), width: 1.5, dashType: 'dash' } });
        slide.addText(stage.year, { x: xPos-0.6, y: 3.9, w: 1.3, h: 0.3, color: stage.c.replace('#',''), fontSize: 16, bold: true, align: 'center', fontFace: 'Trebuchet MS' });
        slide.addText(stage.title, { x: xPos-0.75, y: 4.2, w: 1.6, h: 0.3, color: theme.white, fontSize: 14, bold: true, align: 'center' });
        slide.addText(stage.detail, { x: xPos-0.85, y: 4.5, w: 1.8, h: 0.8, color: theme.textMuted, fontSize: 11, align: 'center', valign: 'top' });
    }
});

// ========================
// SLIDE 3: Dev Tools
// ========================
slide = pres.addSlide({ masterName: 'CONTENT_MASTER' });
slide.addText('T O O L S', { x: 7.5, y: 0.5, w: 2.0, h: 1, color: theme.watermark, fontSize: 50, bold: true, align: 'right', fontFace: 'Impact' });
slide.addText('核心开发阵列', { x: 0.6, y: 0.5, w: 8, h: 0.8, color: theme.white, fontSize: 32, bold: true, fontFace: 'Trebuchet MS' });

const ides = [
    { n: 'Cursor', d: '标杆生态位，基于 VS Code，无缝继承其历史资产。支持强上下文及 Composer', c: '3B82F6' },
    { n: 'Windsurf', d: 'Cascade 实时深层分析，无缝协同双引擎，补全流体质感优秀。', c: theme.cyan },
    { n: 'Trae', d: '字节强推工具网络，国内专线模型支持，极优的使用稳定性。', c: '8B5CF6' },
    { n: 'Antigravity', d: '强自由度 Agent 编码框架，自我推演、验证修正与执行落地。', c: '10B981' },
    { n: 'Void', d: '主打隐私与本地硬件调优环境，完全无遥测的开源终端生态。', c: '64748B' },
    { n: 'Warp', d: '颠覆型终端交互革命，以块状记录(Block)拆解命令执行。', c: 'F43F5E' }
];
ides.forEach((ide, i) => {
    let col = i % 3;
    let row = Math.floor(i / 3);
    let x = 0.6 + col * 3.0;
    let y = 1.6 + row * 1.8;
    
    slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 2.8, h: 1.5, fill: { color: theme.surface } });
    slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 0.06, h: 1.5, fill: { color: ide.c } });
    
    slide.addText(ide.n, { x: x+0.2, y: y+0.1, w: 2.5, h: 0.4, color: theme.white, fontSize: 20, bold: true });
    slide.addText(ide.d, { x: x+0.2, y: y+0.6, w: 2.4, h: 0.8, color: theme.textMuted, fontSize: 12, valign: 'top' });
});

// ========================
// SLIDE 4: Concepts
// ========================
slide = pres.addSlide({ masterName: 'CONTENT_MASTER' });
slide.addText('C O N C E P T', { x: 5.5, y: 0.5, w: 4.0, h: 1, color: theme.watermark, fontSize: 50, bold: true, align: 'right', fontFace: 'Impact' });
slide.addText('全栈 AI 规则资产', { x: 0.6, y: 0.5, w: 8, h: 0.8, color: theme.white, fontSize: 32, bold: true, fontFace: 'Trebuchet MS' });

const concepts = [
    { t: 'Rules (基础规范)', s: '01', d: '定义底座参数: 项目架构、目录守则与编写基准。彻底消除 AI 在多轮迭代中发生的上下文漂移或代码风格异化危险。', c: '3B82F6', yy: 1.5 },
    { t: 'MCP (组件引擎)', s: '02', d: '赋予实证能力: 通过标准化通信接口接管系统大核心环境（文件树、外部私库、CLI）。暴力打破长久以来的预测黑盒状态。', c: '10B981', yy: 2.7 },
    { t: 'Skills (指令原子)', s: '03', d: '提炼最佳实践: 将复杂排障、提测脚本等高频动作模块化。封装标准执行动作，断绝对每次回答产生的随机不确定性。', c: theme.pink, yy: 3.9 }
];
concepts.forEach((c) => {
    slide.addText(c.s, { x: 0.6, y: c.yy, w: 1, h: 1, color: theme.surfaceAlt, fontSize: 42, bold: true, fontFace: 'Impact' });
    slide.addText(c.t, { x: 1.5, y: c.yy+0.1, w: 2.5, h: 0.4, color: c.c, fontSize: 20, bold: true });
    slide.addShape(pres.shapes.RECTANGLE, { x: 4.2, y: c.yy+0.05, w: 5.2, h: 1.0, fill: { color: theme.surface } });
    slide.addText(c.d, { x: 4.4, y: c.yy+0.05, w: 4.8, h: 1.0, color: theme.textMuted, fontSize: 13, wrap: true, valign: 'middle', lineSpacing: 18 });
});

// ========================
// SLIDE 5: Methodology
// ========================
slide = pres.addSlide({ masterName: 'CONTENT_MASTER' });
slide.addText('R U L E S', { x: 7.5, y: 0.5, w: 2.0, h: 1, color: theme.watermark, fontSize: 50, bold: true, align: 'right', fontFace: 'Impact' });
slide.addText('团队协同方法范式', { x: 0.6, y: 0.5, w: 8, h: 0.8, color: theme.white, fontSize: 32, bold: true, fontFace: 'Trebuchet MS' });

slide.addText('角色彻底倒置', { x: 0.6, y: 1.8, w: 3.5, h: 0.8, color: theme.cyan, fontSize: 26, bold: true });
slide.addText('团队需舍弃“微观造砖者”执念，\n走向“顶层架构师与防腐审查官”。', { x: 0.6, y: 2.5, w: 3.5, h: 1.5, color: theme.white, fontSize: 18, bold: true, valign: 'top', lineSpacing: 24 });

slide.addShape(pres.shapes.RECTANGLE, { x: 4.5, y: 1.5, w: 4.9, h: 3.6, fill: { color: theme.surface } });
const steps = [
    { step: '01', title: '自顶向下, 结构先行', desc: '绝对要求首先敲定接口规约与数据流表，封杀 AI 发散式的底层构想。然后才可交予其进行颗粒填补。' },
    { step: '02', title: '微粒度拆解与止损', desc: '拆解的诉求应无限趋小。一旦发现反馈偏离正确象限，必须绝对回退 Git 指针，不可任由幻觉污染。' },
    { step: '03', title: '强化极端域防腐审查', desc: 'AI代码只是逻辑速写。合并审查人员必当对其进行最严苛的异常攻击研判。安全基线由人来守住。' }
];
steps.forEach((s, i) => {
    let y = 1.7 + i * 1.1;
    slide.addShape(pres.shapes.RECTANGLE, { x: 4.8, y: y+0.15, w: 0.05, h: 0.5, fill: { color: theme.amber } });
    slide.addText(s.title, { x: 5.1, y: y, w: 4, h: 0.4, color: theme.white, fontSize: 16, bold: true });
    slide.addText(s.desc, { x: 5.1, y: y+0.4, w: 4.1, h: 0.6, color: theme.textMuted, fontSize: 12, valign: 'top', lineSpacing: 16 });
});

pres.writeFile({ fileName: 'docs/ai_demo_presentation.pptx' }).then(fileName => {
    console.log(`Updated successfully: ${fileName}`);
});
