const SocialLinksPlaceholder = (name: string) => {
  switch (name) {
    case 'website':
      return 'Website Link Here'
    case 'instagram':
      return 'Instagram Profile Link Here'
    case 'facebook':
      return 'Facebook Profile Link Here'
    case 'twitter':
      return 'Twitter Profile Link Here'
    case 'behance':
      return 'Behance Profile Link Here'
    case 'discord':
      return 'Discord Profile Link Here'
    case 'pintrest':
      return 'Pintrest Profile Link Here'
    case 'snapchat':
      return 'Snapchat Profile Link Here'
    case 'tiktok':
      return 'TikTok Profile Link Here'
    case 'phone':
      return 'Add your phone number'
    case 'whatsapp':
      return 'Add your Whatsapp here'
    case 'telegram':
      return 'Add your Telegram here'
    case 'linkedin':
      return 'LinkedIn Profile Link Here'
    case 'reddit':
      return 'Reddit Profile Link Here'
    case 'email':
      return 'Email Address Here'

    default: return 'Add your link here'
  }
}

export default SocialLinksPlaceholder