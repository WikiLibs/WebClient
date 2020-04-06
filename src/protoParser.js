const SearchTable = [
    {
        search: /((\w+\**) (\w+))/gm,
        replacement: "<span class='type'>$2</span> $3"
    },
    {
        search: /(const )((\w+\**) (\w+))/gm,
        replacement: "<span class='flag'>$1</span> <span class='type'>$3</span> $4"
    },
    {
        search: /(class|template)/gm,
        replacement: "<span class='class'>$1</span>"
    },
    {
        search: /(public|private|protected|static|virtual)/gm,
        replacement: "<span class='flag'>$1</span>"
    }
];

function HtmlEncode(s) {
    var el = document.createElement("div");
    el.innerText = el.textContent = s;
    s = el.innerHTML;
    return s;
}

function applyRegex(s, regex, replacement, lst) {
    let result;
    while ((result = regex.exec(s)) !== null) {
        let start = result.index;
        let end = result.index + result[0].length;
        let rep = replacement;
        for (let i = 0; i !== result.length - 1; ++i) {
            rep = rep.replace('$' + (i + 1), result[i + 1]);
        }
        for (let i in lst) {
            let obj = lst[i];
            if ((start >= obj.start && start <= obj.end) || (end >= obj.start && end <= obj.end))
                lst.splice(i, 1);
        }
        lst.push({
            replacement: rep,
            start: start,
            end: end
        });
    }
}

function protoToHtml(s) {
    let lst = [];
    s = HtmlEncode(s);
    for (let i in SearchTable) {
        let o = SearchTable[i];
        applyRegex(s, o.search, o.replacement, lst);
    }
    lst = lst.sort((a, b) => a.start - b.start);
    let offset = 0;
    for (let i in lst) {
        let obj = lst[i];
        s = s.substr(0, obj.start + offset) + obj.replacement + s.substr(obj.end + offset);
        offset += obj.replacement.length - (obj.end - obj.start);
    }
    return (s);
}

export { protoToHtml };
