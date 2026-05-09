# Recovery MVP — Mock UI & Workflow Design

## Product Goal

A lightweight recovery tracking platform for trainers and athletes that improves client compliance, increases visibility into recovery habits, and helps trainers identify burnout or under-recovery before it impacts performance.

---

# Core User Types

## 1. Trainer

Primary goals:

* Monitor athlete recovery trends
* Identify missed recovery sessions
* Improve client accountability
* Reduce manual follow-up texting
* Build retention through measurable recovery progress

## 2. Client / Athlete

Primary goals:

* Simple daily recovery check-ins
* Understand how recovery affects performance
* Build healthier habits
* Receive reminders and encouragement
* Track soreness, sleep, hydration, and mood trends

---

# Product Principles

## Keep It Lightweight

The MVP should feel:

* Faster than filling out a spreadsheet
* Easier than texting a trainer
* Less overwhelming than full fitness software

Target daily athlete interaction:

* Under 60 seconds

Target trainer workflow:

* Under 5 minutes for daily review

---

# MVP Workflow Overview

```
Trainer invites athlete
        ↓
Athlete downloads or opens web app
        ↓
Athlete completes daily recovery check-in
        ↓
Recovery score generated
        ↓
Trainer dashboard updates
        ↓
Trainer reviews compliance + risk flags
        ↓
Trainer follows up if needed
```

---

# Athlete / Client Workflow

# 1. Onboarding Flow

## Screen: Welcome

Headline: "Recover Better. Perform Better."

Subtext: "Track how your body feels in under a minute each day."

Primary CTA:

* Get Started

Secondary CTA:

* Join With Trainer Code

---

## Screen: Basic Setup

Fields:

* Name
* Sport / Activity
* Training frequency
* Primary goals

Optional:

* Wearable integration later

CTA:

* Continue

---

## Screen: Notification Preferences

Prompt: "When should we remind you to check in?"

Options:

* Morning
* After training
* Evening

CTA:

* Finish Setup

---

# 2. Daily Recovery Check-In Flow

## Design Goals

* Thumb-friendly
* Swipe-based
* Minimal typing
* Emotionally positive
* Fast completion

Estimated completion time: 30–45 seconds

---

# Screen: Daily Check-In Home

## Header

Good morning, Chris 👋

## Recovery Score Card

Large circular recovery score:

* 82 / 100

Subtext: "You’re recovering well today"

## CTA Button

Start Today’s Check-In

---

# Screen: Soreness Check-In

## Prompt

"How sore does your body feel today?"

## Input

Body soreness slider:

* 1 = Fresh
* 10 = Extremely sore

## Optional Body Map

Tap areas:

* Legs
* Back
* Shoulders
* Arms
* Knees

## UX Notes

* Large slider
* Emoji feedback
* Smooth transition animations

CTA:

* Next

---

# Screen: Hydration Check-In

## Prompt

"How hydrated do you feel today?"

## Inputs

Quick-select buttons:

* Excellent
* Good
* Average
* Poor

Optional: Water intake estimate

Visual: Animated water fill card

CTA:

* Next

---

# Screen: Sleep Check-In

## Prompt

"How did you sleep last night?"

## Inputs

Hours slept selector:

* Under 5
* 5–6
* 6–7
* 7–8
* 8+

Sleep quality slider:

* Terrible → Great

Optional: "Did you wake up during the night?"

CTA:

* Next

---

# Screen: Mood & Energy Check-In

## Prompt

"How are you feeling mentally today?"

## Inputs

Mood selector:

* Motivated
* Neutral
* Stressed
* Exhausted
* Anxious

Energy slider:

* Low → High

Optional journal note: "Anything affecting recovery today?"

CTA:

* Finish Check-In

---

# Screen: Recovery Summary

## Header

Today’s Recovery Score: 74

## Breakdown Cards

* Sleep: Good
* Hydration: Average
* Soreness: Elevated
* Mood: Stable

## Smart Insight Examples

* “Your soreness is trending upward this week.”
* “Sleep consistency improved 3 days in a row.”
* “Hydration may be impacting recovery.”

## CTA

Done

Optional: Share with Trainer

---

# Athlete Home Dashboard

## Key Components

### 1. Recovery Score Card

Large score with color state:

* Green = good
* Yellow = caution
* Red = recovery risk

---

### 2. Weekly Trends

Mini charts:

* Sleep
* Hydration
* Soreness
* Mood

---

### 3. Streak System

Examples:

* 7-day check-in streak
* Weekly recovery consistency

---

### 4. Trainer Messages

Simple communication area:

* “Take recovery seriously today.”
* “Great improvement this week.”

---

# Trainer Workflow

# 1. Trainer Onboarding

## Initial Setup

Trainer creates:

* Team or gym
* Client roster
* Invite links

Optional later:

* Multiple teams
* Assistant coaches

---

# 2. Trainer Dashboard

## Dashboard Goals

Allow trainers to instantly identify:

* Who checked in
* Who missed recovery tracking
* Which athletes are high-risk
* Recovery trends across roster

---

# Trainer Dashboard Layout

## Top Metrics Row

Cards:

* Total Athletes
* Checked In Today
* Missed Check-Ins
* Recovery Risk Alerts

Example:

* 28 Athletes
* 21 Checked In
* 7 Missed
* 4 High Risk

---

## Athlete Compliance Table

Columns:

* Athlete Name
* Recovery Score
* Last Check-In
* Sleep
* Soreness
* Mood
* Status

Status examples:

* Healthy
* Watch
* At Risk

High-risk rows highlighted subtly.

---

## Missed Check-In Section

Dedicated panel: "Needs Follow-Up"

Features:

* One-click reminder
* Bulk reminder sending
* Last completed check-in timestamp

Potential CTA: Send Reminder

---

## Recovery Risk Feed

Feed examples:

* "3 consecutive poor sleep reports"
* "Soreness increased 25% this week"
* "Mood declining for 4 days"
* "Missed 2 recovery check-ins"

Purpose: Help trainers proactively intervene.

---

# Athlete Detail View (Trainer)

## Athlete Header

* Name
* Sport
* Training schedule
* Current recovery score

---

## Trend Charts

Visual graphs:

* Sleep trends
* Soreness trends
* Hydration trends
* Mood trends

Time filters:

* 7 days
* 30 days
* Season

---

## Compliance Section

Metrics:

* Weekly completion %
* Missed check-ins
* Average recovery score

---

## Trainer Notes

Private notes:

* Injury concerns
* Behavioral observations
* Coaching adjustments

---

## Messaging Panel

Quick responses:

* “Prioritize sleep tonight.”
* “Reduce training intensity tomorrow.”
* “Great consistency this week.”

---

# Notification & Reminder UX

## Athlete Reminders

Examples:

* “Quick recovery check-in before practice?”
* “How’s your body feeling today?”
* “Don’t break your recovery streak.”

Tone: Supportive, not guilt-based.

---

## Trainer Alerts

Examples:

* “4 athletes missed check-ins today.”
* “2 athletes flagged for elevated soreness.”
* “Recovery compliance dropped this week.”

---

# Recovery Scoring Logic (MVP)

## Inputs

Weighted categories:

* Sleep
* Hydration
* Soreness
* Mood
* Energy
* Check-in consistency

---

## Example Formula

```
Sleep Quality      = 30%
Hydration          = 20%
Soreness           = 25%
Mood / Energy      = 20%
Consistency Bonus  = 5%
```

---

# Suggested MVP Screens

## Athlete Screens

1. Welcome
2. Onboarding
3. Daily Check-In
4. Recovery Summary
5. Home Dashboard
6. Trends
7. Notifications

---

## Trainer Screens

1. Login
2. Team Dashboard
3. Athlete Detail View
4. Compliance View
5. Messaging Panel
6. Settings / Invite Athletes

---

# Visual Design Direction

## Style

* Minimal
* Modern wellness aesthetic
* Calm and performance-oriented
* Mobile-first

---

## Color Concepts

* Deep navy backgrounds
* Soft green success states
* Amber warning states
* Muted red risk states
* White cards with soft shadows

---

## Typography

* Large readable metrics
* Clean sans-serif fonts
* High contrast for mobile readability

---

# Recommended MVP Tech Stack

## Frontend

* Next.js
* React
* Tailwind CSS
* shadcn/ui

---

## Backend

* Supabase or
* Firebase

---

## Notifications

* OneSignal
* Expo Push Notifications
* Twilio (optional SMS)

---

# Future Expansion Ideas

## AI Insights

Potential future features:

* Burnout prediction
* Recovery coaching suggestions
* Sleep pattern insights
* Personalized recommendations

---

## Wearable Integrations

Future integrations:

* Apple Health
* WHOOP
* Garmin
* Oura
* Fitbit

---

## Revenue Expansion

Potential monetization:

* Trainer subscriptions
* Team plans
* Enterprise gym packages
* White-labeled coaching portals

---

# Recommended MVP Build Order

## Phase 1 — Validation

* Trainer interviews
* Athlete interviews
* Clickable Figma prototype
* Validate check-in workflow

---

## Phase 2 — MVP Build

Build:

* Authentication
* Daily check-ins
* Recovery score engine
* Trainer dashboard
* Notifications

---

## Phase 3 — Pilot Program

Run pilot with:

* 3–5 trainers
* 20–50 athletes

Track:

* Daily active users
* Check-in completion rate
* Trainer retention
* Engagement trends

---

# Key MVP Success Metrics

## Athlete Metrics

* Daily check-in completion rate
* Weekly engagement
* Recovery streak retention

---

## Trainer Metrics

* Dashboard usage frequency
* Athlete compliance improvement
* Retention after first month

---

# Final MVP Positioning

"A lightweight recovery accountability platform for trainers and athletes that makes recovery visible, measurable, and actionable."
