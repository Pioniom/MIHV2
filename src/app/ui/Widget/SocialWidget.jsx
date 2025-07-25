'use client';

import React from 'react'
import Link from "next/link";
import { Icon } from '@iconify/react';
import Div from '../Div';

export default function SocialWidget() {
  return (
    <Div className="cs-social_btns cs-style1">
      <Link href='/' className="cs-center" aria-label="Medical Inn Hair auf LinkedIn">
        <Icon icon="fa6-brands:linkedin-in" />
      </Link>
      <Link href='/' className="cs-center" aria-label="Medical Inn Hair auf Twitter">
        <Icon icon="fa6-brands:twitter" />               
      </Link>
      <Link href='/' className="cs-center" aria-label="Medical Inn Hair auf YouTube">
        <Icon icon="fa6-brands:youtube" />              
      </Link>
      <Link href='/' className="cs-center" aria-label="Medical Inn Hair auf Slack">
        <Icon icon="fa6-brands:slack" />
      </Link>
    </Div>
  )
}
