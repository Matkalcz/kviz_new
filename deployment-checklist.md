# Deployment Checklist - kviz.michaljanda.com

## Pre-deployment (Before `npm run build`)

- [ ] **Backup current deployment**
  - `sudo cp /etc/nginx/sites-available/kviz.michaljanda.com /etc/nginx/sites-available/kviz.michaljanda.com.backup.$(date +%s)`
  - Note current server PID: `ps aux | grep "node server.js" | grep -v grep`
  
- [ ] **Check Git status**
  - `git status` - ensure no uncommitted changes
  - `git pull` - get latest changes if using version control
  
- [ ] **Verify dependencies**
  - `npm ci` or `npm install` - ensure dependencies are up to date
  - Check for security vulnerabilities: `npm audit`

## Build Process

- [ ] **Run build**
  - `npm run build` - full Next.js build
  
- [ ] **Verify build output**
  - Run verification script: `./verify-build.sh`
  - Check for errors in output
  - Ensure CSS and JS files are present
  
- [ ] **Check build stats**
  - Review bundle sizes in build output
  - Note any significant changes in size
  
## Post-build Verification

- [ ] **Copy static files to standalone directory**
  - `cp -r .next/static .next/standalone/.next/` (if using standalone output)
  
- [ ] **Test locally (optional)**
  - `cd .next/standalone && PORT=3003 node server.js`
  - Check `http://localhost:3003/admin` in browser
  
## Deployment

- [ ] **Stop current server**
  - Find PID: `sudo lsof -ti:3002`
  - Kill process: `sudo kill -9 <PID>`
  - Wait 3 seconds: `sleep 3`
  
- [ ] **Start new server**
  - `cd /home/openclaw/.openclaw/workspace-domminik/kviz-new/.next/standalone`
  - `PORT=3002 node server.js 2>&1 &`
  - Note PID: `echo $!`
  
- [ ] **Verify server is running**
  - `curl -s http://localhost:3002/admin | grep -q "KvizAdmin" && echo "Server OK" || echo "Server FAILED"`
  - Wait 5 seconds for server to fully start
  
- [ ] **Run health checks**
  - `./health-check-static.sh` - verify all static files
  - Check exit code: `echo $?` (should be 0)

## Nginx Configuration (if changed)

- [ ] **Update nginx config** (if needed)
  - Edit `/etc/nginx/sites-available/kviz.michaljanda.com`
  - Test config: `sudo nginx -t`
  - Reload nginx: `sudo systemctl reload nginx`
  
- [ ] **Verify nginx routing**
  - `curl -k -I https://kviz.michaljanda.com/admin` - should return 200
  - `curl -k -I https://kviz.michaljanda.com/_next/static/css/*.css` - should return 200

## Post-deployment Monitoring

- [ ] **Check error logs**
  - `sudo tail -20 /var/log/nginx/error.log`
  - Look for any new errors
  
- [ ] **Check access logs**
  - `sudo tail -10 /var/log/nginx/access.log | grep kviz.michaljanda.com`
  
- [ ] **Monitor server health**
  - `ps aux | grep "node server.js"` - check memory usage
  - `sudo netstat -tlnp | grep :3002` - verify port is listening
  
- [ ] **Test user flows**
  - Visit `https://kviz.michaljanda.com/admin` in browser
  - Test form submissions if applicable
  - Verify all navigation links work

## Rollback Plan (if deployment fails)

### Immediate rollback (server issue)
1. Kill new server: `sudo kill -9 <NEW_PID>`
2. Restart old server from backup location
3. If old server not available, restore from previous build

### Configuration rollback (nginx issue)
1. Restore backup config: `sudo cp /etc/nginx/sites-available/kviz.michaljanda.com.backup.* /etc/nginx/sites-available/kviz.michaljanda.com`
2. Reload nginx: `sudo systemctl reload nginx`

### Database/migration rollback
1. If database changes were made, restore from backup
2. Use migration rollback scripts if available

## Emergency Contacts

- **Primary maintainer**: Domminik (current agent)
- **Secondary**: Mateej (agent)
- **Infrastructure**: OpenClaw host (Matkalcz)

## Notes

- **Build frequency**: Deploy when significant features added or bugs fixed
- **Maintenance window**: Preferably during low traffic hours
- **Backup location**: `/home/openclaw/.openclaw/workspace-domminik/kviz-new/.next/standalone/backup/`
- **Logs directory**: `/var/log/nginx/` and server logs in `/tmp/next-server.log`

---
*Last updated: 2026-03-08*
*Version: 1.0*