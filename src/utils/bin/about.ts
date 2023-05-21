export const about = async (args: string[]): Promise<string> => {
  const bioDesktop = `  I am a Full-Stack Developer with a deep passion for TypeScript 
  and a natural curiosity to explore all aspects of technology.
  My ultimate goal is to become an AI Engineer.`
  const bioMobile = `I am a Full-Stack Developer with a deep passion for\nTypeScript and a natural curiosity to explore all\naspects of technology. My ultimate goal is to become an AI Engineer.`

  return window.innerWidth > 768 ? bioDesktop : bioMobile
}
