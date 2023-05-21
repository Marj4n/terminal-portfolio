import { getMainColor, getPlatform } from "@/api"
import { formatDistanceToNow } from "date-fns"

import packageJson from "../../../package.json"

const macos = `
                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.    
 XMMMMMMMMMMMMMMMMMMMMMMMX.      
;MMMMMMMMMMMMMMMMMMMMMMMM:       
:MMMMMMMMMMMMMMMMMMMMMMMM:       
.MMMMMMMMMMMMMMMMMMMMMMMMX.      
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.    
 .XMMMMMMMMMMMMMMMMMMMMMMMMMMk   
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.   
    kMMMMMMMMMMMMMMMMMMMMMMd     
     ;KMMMMMMMWXXWMMMMMMMk.      
       .cooc,.    .,coo:.        
`

const windows = `
                                ..,
                    ....,,:;+ccllll
      ...,,+:;  cllllllllllllllllll
,cclllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
                                      
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
\`'ccllllllllll  lllllllllllllllllll
       \`' \*::  :ccllllllllllllllll
                       \`\`\`\`''*::cll
`

const linux = `
            .-/+oossssoo+/-.               
        \`:+ssssssssssssssssss+:\`           
      -+ssssssssssssssssssyyssss+-         
    .ossssssssssssssssssdMMMNysssso.       
   /ssssssssssshdmmNNmmyNMMMMhssssss/      
  +ssssssssshmydMMMMMMMNddddyssssssss+     
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/    
  +sssssssssdmydMMMMMMMMddddyssssssss+     
   /ssssssssssshdmNNNNmyNMMMMhssssss/      
    .ossssssssssssssssssdMMMNysssso.
      -+sssssssssssssssssyyyssss+-
        \`:+ssssssssssssssssss+:\`
            .-/+oossssoo+/-.
`

const getArt = () => {
  const platform = getPlatform()
  const mainColor = getMainColor()

  switch (platform) {
    case "MacOS":
      return `<p style="color: ${mainColor}">${macos}</p>`
    case "Windows":
      return `<p style="color: ${mainColor}">${windows}</p>`
    case "Linux":
      return `<p style="color: ${mainColor}">${linux}</p>`
  }
}

const getInfo = () => {
  const os = getPlatform()
  const visitedAt = new Date(
    localStorage.getItem("visitedAt") || new Date().toString()
  )
  const hostname = window.location.hostname
  const theme = localStorage.getItem("theme")
  const resolution = `${window.screen.availWidth}x${window.screen.availHeight}`
  const packages = Object.keys(packageJson.dependencies)
  const devPackages = Object.keys(packageJson.devDependencies)
  const mainColor = getMainColor()

  let message = ""

  message += `<span style="color: ${mainColor}">Host</span>: ${hostname}\n`
  message += `<span style="color: ${mainColor}">OS</span>: ${os}\n`
  message += `<span style="color: ${mainColor}">Packages</span>: ${
    packages.length + devPackages.length
  } (npm)\n`
  message += `<span style="color: ${mainColor}">Resolution</span>: ${resolution}\n`
  message += `<span style="color: ${mainColor}">Shell</span>: Marjan | Terminal\n`
  message += `<span style="color: ${mainColor}">Theme</span>: ${theme}\n`
  message += `<span style="color: ${mainColor}">Version</span>: ${packageJson.version}\n`
  message += `<span style="color: ${mainColor}">Uptime</span>: ${formatDistanceToNow(
    visitedAt
  )}\n`
  message += `<span style="color: ${mainColor}">Author</span>: ${packageJson.author.name} (${packageJson.author.email})\n`
  message += `<span style="color: ${mainColor}">License</span>: ${packageJson.license}\n`
  message += `<span style="color: ${mainColor}">Support me</span>: <a href="${packageJson.funding.url}">${packageJson.funding.url}\n</a>`

  return message
}

export const neofetch = async (args?: string[]): Promise<string> => {
  const art = getArt()
  const info = getInfo()

  return `
  <table>
    <tr>
      <td>${art}</td>
      <td>${info}</td>
    <tr>
  </table>
  `
}
