#!/bin/bash
# Health check script for kviz.michaljanda.com
# Run every 5 minutes via cron

LOG_FILE="/home/openclaw/.openclaw/workspace-domminik/kviz-new/scripts/health-check.log"
MAX_LOG_SIZE=10485760 # 10MB

# Function to log with timestamp
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# Rotate log if too large
if [ -f "$LOG_FILE" ] && [ $(stat -c%s "$LOG_FILE") -gt $MAX_LOG_SIZE ]; then
    mv "$LOG_FILE" "${LOG_FILE}.old"
    log "Rotated log file"
fi

# Check if server is responding
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3002/admin 2>/dev/null || echo "000")

if [ "$STATUS" = "200" ]; then
    log "OK - Server responding with HTTP 200"
    exit 0
else
    log "ERROR - Server returned HTTP $STATUS, restarting via PM2"
    
    # Restart via PM2
    pm2 restart kviz-nextjs 2>&1 >> "$LOG_FILE"
    RESTART_RESULT=$?
    
    if [ $RESTART_RESULT -eq 0 ]; then
        log "SUCCESS - PM2 restart completed"
    else
        log "CRITICAL - PM2 restart failed with code $RESTART_RESULT"
        # Try to start if not running
        pm2 start kviz-nextjs 2>&1 >> "$LOG_FILE"
    fi
    
    exit 1
fi