#!/usr/bin/python3
import json
from bs4 import BeautifulSoup

def stripNewLine(line):
  return ' '.join([ x.strip() for x in line.split('\n')])

def actionFormat(line, output):
  lineObj = {
    'quote': False,
    'character': None,
    'line': stripNewLine(line.contents[0].strip())
  }
  output.append(lineObj)

def quoteFormat(line, output):
  if (len(line.contents) > 1):
    character = line.b.contents[0].strip()
    quote = stripNewLine(line.contents[1].strip())
    lineObj = {
      'quote': True,
      'character': character,
      'line': quote
    }
    output.append(lineObj)

def linesParse(lines, output):
  for line in lines:
    if (line.b):
      quoteFormat(line, output)
    else:
      actionFormat(line, output)

def main():
  output = []
  with open('../input/1.htm', 'r') as f:
    read_data = f.read()
  soup = BeautifulSoup(read_data, "html.parser")
  lines = soup.body.find_all('p')
  linesParse(lines, output)
  with open('../output/sw1.json', 'w') as outfile:
    json.dump(output, outfile)

if __name__ == '__main__':
  main()