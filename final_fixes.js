const fs = require('fs');
const path = require('path');

// 1. Fix links in index.html
const indexFile = path.join('c:\\Users\\herma\\Videos\\WasteUniverse', 'index.html');
let indexContent = fs.readFileSync(indexFile, 'utf8');

indexContent = indexContent.replace(/<a href="#" class="logo">/, '<a href="index.html" class="logo">');
indexContent = indexContent.replace(/<li><a href="#">Home<\/a><\/li>/g, '<li><a href="index.html">Home</a></li>');
indexContent = indexContent.replace(/<li><a href="#">About Us<\/a><\/li>/g, '<li><a href="index.html#about">About Us</a></li>');
indexContent = indexContent.replace(/<li><a href="#">Contact<\/a><\/li>/g, '<li><a href="index.html#contact-form-section">Contact</a></li>');
indexContent = indexContent.replace(/<li><a href="#">Residential<\/a><\/li>/g, '<li><a href="services.html">Residential</a></li>');
indexContent = indexContent.replace(/<li><a href="#">Commercial<\/a><\/li>/g, '<li><a href="services.html">Commercial</a></li>');
indexContent = indexContent.replace(/<li><a href="#">Recycling<\/a><\/li>/g, '<li><a href="sustainability.html">Recycling</a></li>');
indexContent = indexContent.replace(/<li><a href="#">Support<\/a><\/li>/g, '<li><a href="index.html#contact-form-section">Support</a></li>');

// 2. Add Read More to About Us in index.html
const oldAboutContent = `<p>Being local means more to us than simply operating in Massachusetts. We live here, work here, and understand the needs of the towns and neighborhoods we serve because they are our communities too. We believe waste management should be straightforward, dependable, and backed by real people who care about doing the job right. Our customers are not just account numbers. They are our neighbors, local families, and businesses that rely on us every week.</p>
                <p>At Waste Universe, we take pride in bringing a personal touch to an essential service. Whether we are serving a household, supporting a local business, or expanding into a new community, our approach remains the same. We show up, communicate clearly, and work hard to provide the level of service we would expect for our own families and neighbors. As we continue to grow, we remain committed to the values Waste Universe was founded on: reliability, community, and service you can count on.</p>`;

const newAboutContent = `<div id="aboutMoreText" style="display: none;">
                    <p>Being local means more to us than simply operating in Massachusetts. We live here, work here, and understand the needs of the towns and neighborhoods we serve because they are our communities too. We believe waste management should be straightforward, dependable, and backed by real people who care about doing the job right. Our customers are not just account numbers. They are our neighbors, local families, and businesses that rely on us every week.</p>
                    <p>At Waste Universe, we take pride in bringing a personal touch to an essential service. Whether we are serving a household, supporting a local business, or expanding into a new community, our approach remains the same. We show up, communicate clearly, and work hard to provide the level of service we would expect for our own families and neighbors. As we continue to grow, we remain committed to the values Waste Universe was founded on: reliability, community, and service you can count on.</p>
                </div>
                <button id="aboutReadMoreBtn" onclick="toggleAboutText()" class="btn btn-outline" style="margin-top: 10px; cursor: pointer;">Read More</button>
                <script>
                    function toggleAboutText() {
                        var moreText = document.getElementById("aboutMoreText");
                        var btnText = document.getElementById("aboutReadMoreBtn");
                        if (moreText.style.display === "none" || moreText.style.display === "") {
                            moreText.style.display = "block";
                            btnText.innerHTML = "Read Less";
                        } else {
                            moreText.style.display = "none";
                            btnText.innerHTML = "Read More";
                        }
                    }
                </script>`;

indexContent = indexContent.replace(oldAboutContent, newAboutContent);

fs.writeFileSync(indexFile, indexContent, 'utf8');

// 3. Fix links in careers.html
const careersFile = path.join('c:\\Users\\herma\\Videos\\WasteUniverse', 'careers.html');
let careersContent = fs.readFileSync(careersFile, 'utf8');
careersContent = careersContent.replace(/<li><a href="#">Careers<\/a><\/li>/g, '<li><a href="careers.html">Careers</a></li>');
fs.writeFileSync(careersFile, careersContent, 'utf8');

console.log("Fixed all remaining links and added Read More to About Us!");
