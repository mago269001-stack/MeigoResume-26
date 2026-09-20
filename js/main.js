document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('data/resume-data.json');
        const data = await response.json();
        
        renderPersonal(data.personal);
        renderSkills(data.skills);
        renderExperiences(data.experiences);
        renderPortfolios(data.portfolios);
        renderCerts(data.certs);
    } catch (error) {
        console.error("無法載入履歷資料：", error);
    }
});

function renderPersonal(p) {
    document.getElementById("nav-name").textContent = `${p.name} (${p.enName})`;
    document.getElementById("header-name").innerHTML = `${p.name} <span class="text-lg font-normal text-white/90">${p.enName}</span>`;
    document.getElementById("header-status").innerHTML = `<i class="fa-solid fa-circle text-[#71D68D] text-[8px] mr-1.5 animate-pulse"></i>${p.status}`;
    document.getElementById("header-title").innerHTML = `希望職稱：<span class="bg-white/20 px-2 py-0.5 rounded text-white font-semibold">${p.title}</span>`;
    document.getElementById("contact-phone").textContent = p.phone;
    document.getElementById("contact-email").textContent = p.email;
    document.getElementById("contact-location").textContent = p.location;
    document.getElementById("contact-education").textContent = p.education;
    document.getElementById("header-summary").textContent = p.summary;
    document.getElementById("avatar-img").src = p.avatar;
}

function renderSkills(s) {
    const container = document.getElementById("skills-container");
    container.innerHTML = `
        <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3">
            <div class="flex items-center space-x-2 text-[#958FD6] font-bold">
                <i class="fa-solid fa-palette"></i>
                <h3>視覺設計與影音</h3>
            </div>
            <div class="flex flex-wrap gap-2">
                ${s.visual.map(item => `<span class="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">${item}</span>`).join('')}
            </div>
        </div>
        <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3">
            <div class="flex items-center space-x-2 text-[#66BFD6] font-bold">
                <i class="fa-solid fa-laptop-code"></i>
                <h3>辦公應用與 AI 工具</h3>
            </div>
            <div class="flex flex-wrap gap-2">
                ${s.office.map(item => `<span class="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">${item}</span>`).join('')}
            </div>
        </div>
        <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3">
            <div class="flex items-center space-x-2 text-[#D6AD9C] font-bold">
                <i class="fa-solid fa-clipboard-user"></i>
                <h3>行政管理與生管</h3>
            </div>
            <div class="flex flex-wrap gap-2">
                ${s.admin.map(item => `<span class="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">${item}</span>`).join('')}
            </div>
        </div>
    `;
}

function renderExperiences(exps) {
    const container = document.getElementById("experience-container");
    container.innerHTML = exps.map(exp => `
        <details class="group bg-slate-50 rounded-2xl border border-slate-200/70 overflow-hidden transition open:bg-white open:shadow-md" ${exp.isOpen ? 'open' : ''}>
            <summary class="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 select-none hover:bg-slate-100/60 transition">
                <div class="space-y-1">
                    <div class="flex items-center space-x-2">
                        ${exp.type ? `<span class="px-2.5 py-0.5 bg-[#71D68D]/20 text-emerald-800 rounded-full text-xs font-bold">${exp.type}</span>` : ''}
                        <h3 class="font-bold text-slate-800 text-base sm:text-lg">${exp.title}</h3>
                        <span class="text-slate-400">|</span>
                        <span class="text-slate-600 font-medium text-sm">${exp.company}</span>
                    </div>
                    <p class="text-xs text-slate-500">${exp.meta}</p>
                </div>
                <div class="flex items-center justify-between sm:justify-end space-x-4">
                    <span class="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">${exp.period}</span>
                    <span class="transform group-open:rotate-180 transition text-slate-400"><i class="fa-solid fa-chevron-down"></i></span>
                </div>
            </summary>
            <div class="px-5 pb-5 pt-2 border-t border-slate-100 text-sm text-slate-600 space-y-3">
                <ul class="list-disc list-inside space-y-1.5 leading-relaxed">
                    ${exp.details.map(d => `<li>${d}</li>`).join('')}
                </ul>
                ${exp.tags.length > 0 ? `
                    <div class="flex flex-wrap gap-1.5 pt-2">
                        ${exp.tags.map(t => `<span class="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">${t}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </details>
    `).join('');
}

function renderPortfolios(ports) {
    const container = document.getElementById("portfolio-container");
    container.innerHTML = ports.map(p => `
        <div class="resume-card bg-slate-50 rounded-2xl border border-slate-200/70 overflow-hidden flex flex-col justify-between">
            <div>
                <div class="h-48 w-full bg-slate-200 relative overflow-hidden">
                    <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
                    <span class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
                        ${p.category}
                    </span>
                </div>
                <div class="p-5 space-y-2">
                    <h3 class="font-bold text-slate-800 text-lg">${p.title}</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">${p.description}</p>
                </div>
            </div>
            <div class="p-5 pt-0">
                <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-full space-x-2 bg-[#958FD6] hover:bg-[#8178c7] text-white py-2.5 px-4 rounded-xl text-sm font-medium transition shadow-sm">
                    <span>查看線上作品與詳細說明</span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                </a>
            </div>
        </div>
    `).join('');
}

function renderCerts(certs) {
    const container = document.getElementById("certs-container");
    container.innerHTML = certs.map(c => `
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start space-x-3">
            <div class="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i class="fa-solid fa-certificate text-sm"></i>
            </div>
            <div>
                <h4 class="font-bold text-slate-800 text-sm">${c.name}</h4>
                <p class="text-xs text-slate-500">${c.desc}</p>
            </div>
        </div>
    `).join('');
}

function toggleAllDetails(openState) {
    const detailsList = document.querySelectorAll('#experience-container details');
    detailsList.forEach(details => {
        details.open = openState;
    });
}

function renderPersonal(p) {
    // ...其他程式碼
    document.getElementById("avatar-img").src = p.avatar;
}