#!/usr/bin/python3
import json

def stripNewLine(line):
  return ' '.join([ x.strip() for x in line.split('\n')])

def actionFormat(line, output):
  lineObj = {
    'quote': False,
    'character': None,
    'line': stripNewLine(line.strip())
  }
  output.append(lineObj)

def quoteFormat(quote, output):
  lines = quote.split('\n')
  character = lines[0].strip()
  line = ' '.join([x.strip() for x in lines[1:]])
  lineObj = {
    'quote': True,
    'character': character,
    'line': stripNewLine(line.strip())
  }
  output.append(lineObj)

def linesParse(lines, output):
  for line in lines:
    if (line[0:4] == '\t\t\t\t'):
      quoteFormat(line, output)
    else:
      actionFormat(line, output)

def main():
  output = []
  with open('../input/22.txt', 'rb') as f:
    read_data = f.read()
  lines = read_data.decode('iso-8859-1').split('\n\n')
  # print(lines, len(lines))
  linesParse(lines, output)
  with open('../output/sw2.json', 'w') as outfile:
    json.dump(output, outfile)


if __name__ == '__main__':
  main()