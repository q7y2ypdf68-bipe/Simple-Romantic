from pathlib import Path
import json
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "content" / "guide-pt-br.json").read_text(encoding="utf-8"))
OUTPUT = ROOT / "public" / "downloads" / "30-encontros-simples-gastando-pouco.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

regular = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
bold = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
serif = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
serif_bold = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
pdfmetrics.registerFont(TTFont("SR", regular))
pdfmetrics.registerFont(TTFont("SR-Bold", bold))
pdfmetrics.registerFont(TTFont("SR-Serif", serif))
pdfmetrics.registerFont(TTFont("SR-Serif-Bold", serif_bold))

PINK = colors.HexColor("#ED3F78")
INK = colors.HexColor("#3B2636")
MUTED = colors.HexColor("#755F6D")
YELLOW = colors.HexColor("#FFD45B")
SKY = colors.HexColor("#DDF6FB")
CREAM = colors.HexColor("#FFF7E7")

styles = getSampleStyleSheet()
title = ParagraphStyle("Title", fontName="SR-Serif-Bold", fontSize=29, leading=32, textColor=INK, alignment=TA_CENTER, spaceAfter=10)
subtitle = ParagraphStyle("Subtitle", fontName="SR", fontSize=11, leading=17, textColor=MUTED, alignment=TA_CENTER)
section = ParagraphStyle("Section", fontName="SR-Serif-Bold", fontSize=18, leading=22, textColor=INK, spaceAfter=7)
body = ParagraphStyle("Body", fontName="SR", fontSize=9.4, leading=14.3, textColor=MUTED)
label = ParagraphStyle("Label", fontName="SR-Bold", fontSize=7.7, leading=10, textColor=PINK)
small = ParagraphStyle("Small", fontName="SR", fontSize=7.8, leading=11.5, textColor=MUTED)

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#F3D9E4"))
    canvas.line(18 * mm, 14 * mm, 192 * mm, 14 * mm)
    canvas.setFont("SR", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 9 * mm, "Simple & Romantic - conteúdo gratuito")
    canvas.drawRightString(192 * mm, 9 * mm, f"{doc.page}")
    canvas.restoreState()

doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4, rightMargin=18 * mm, leftMargin=18 * mm, topMargin=18 * mm, bottomMargin=19 * mm, title="30 encontros simples gastando pouco", author="Simple & Romantic")
story = [Spacer(1, 24 * mm), Paragraph("SIMPLE &amp; ROMANTIC", label), Spacer(1, 7 * mm), Paragraph("30 encontros simples<br/>gastando pouco", title), Paragraph("Um guia gratuito para criar presença, conversa e memórias bonitas com o que vocês já têm.", subtitle), Spacer(1, 12 * mm)]
intro = Table([[Paragraph("COMO USAR", label), Paragraph("SEGURANÇA E RESPEITO", label)], [Paragraph("Escolham uma ideia, adaptem ao lugar, ao tempo e aos limites de vocês. Não é necessário seguir tudo: o melhor encontro é o que pode acontecer de verdade.", body), Paragraph("Confiram horários, clima, transporte e regras locais. Consentimento pode ser revisto a qualquer momento. Nenhum roteiro vale mais que o bem-estar das duas pessoas.", body)]], colWidths=[84 * mm, 84 * mm], hAlign="CENTER")
intro.setStyle(TableStyle([("BACKGROUND", (0,0), (0,-1), CREAM), ("BACKGROUND", (1,0), (1,-1), SKY), ("BOX", (0,0), (-1,-1), .7, colors.HexColor("#EBCFDB")), ("INNERGRID", (0,0), (-1,-1), .5, colors.white), ("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 12), ("RIGHTPADDING", (0,0), (-1,-1), 12), ("TOPPADDING", (0,0), (-1,-1), 10), ("BOTTOMPADDING", (0,0), (-1,-1), 10)]))
story += [intro, Spacer(1, 14 * mm), Paragraph("Romance não precisa ser caro. Precisa ser percebido.", ParagraphStyle("Quote", parent=section, alignment=TA_CENTER, textColor=PINK)), PageBreak()]

for index, item in enumerate(DATA):
    card = Table([
        [Paragraph(item["number"], ParagraphStyle("Number", fontName="SR-Serif-Bold", fontSize=22, textColor=PINK)), Paragraph(item["title"], section)],
        [Paragraph("ONDE", label), Paragraph(item["setting"], body)],
        [Paragraph("TEMPO E CUSTO", label), Paragraph(f'{item["duration"]} - {item["cost"]}', body)],
        [Paragraph("LEVAR", label), Paragraph(item["bring"], body)],
        [Paragraph("O PLANO", label), Paragraph(item["plan"], body)],
        [Paragraph("PEQUENO DETALHE", label), Paragraph(item["detail"], body)],
        [Paragraph("PLANO B", label), Paragraph(item["backup"], body)],
    ], colWidths=[34 * mm, 134 * mm], hAlign="CENTER")
    card.setStyle(TableStyle([("BACKGROUND", (0,0), (0,-1), CREAM if index % 2 == 0 else SKY), ("BACKGROUND", (1,0), (1,0), colors.HexColor("#FFF4F8")), ("BOX", (0,0), (-1,-1), .8, colors.HexColor("#EACFDA")), ("INNERGRID", (0,1), (-1,-1), .35, colors.HexColor("#EDDDE4")), ("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 10), ("RIGHTPADDING", (0,0), (-1,-1), 10), ("TOPPADDING", (0,0), (-1,-1), 7), ("BOTTOMPADDING", (0,0), (-1,-1), 7)]))
    story.append(KeepTogether([card, Spacer(1, 6 * mm)]))

story += [PageBreak(), Spacer(1, 35 * mm), Paragraph("Criem o encontro 31.", title), Paragraph("Misturem uma atividade, uma conversa e um gesto que tenha a cara de vocês. Guardem o que funcionou e deixem o restante ir. O objetivo nunca foi cumprir uma lista - foi voltar a escolher tempo juntos.", subtitle), Spacer(1, 12 * mm), Paragraph("simple &amp; romantic", ParagraphStyle("Brand", fontName="SR-Serif-Bold", fontSize=24, textColor=PINK, alignment=TA_CENTER)), Spacer(1, 5 * mm), Paragraph("Momentos simples. Memórias bonitas.", subtitle)]

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUTPUT)
