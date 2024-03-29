<?php
	$versionPath = "http://labor.ny.gov/css/apps/v.0.4.6";
?>

<!DOCTYPE html>
<html class="no-js" lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>User Experience (UX) v.0.4.6 Template</title>

		<!-- Styles -->
		<link rel="shortcut icon" href="<?php echo $versionPath ?>/favicon.ico" type="image/x-icon">
		<link rel="stylesheet" type="text/css" media="screen" href="<?php echo $versionPath ?>/css/ux-style.min.css" >		
		<link rel="stylesheet" type="text/css" media="print" href="<?php echo $versionPath ?>/css/print.min.css" >

		<!-- Scripts -->
		<script src="<?php echo $versionPath ?>/js/modernizr.min.js"></script>
		<script src="https://www.google.com/jsapi"></script>
		
		
		<!-- Additional <head> items below this line -->

	</head>

	<!--[if IE 7 ]>    <body class=" ie7 "> <![endif]-->
	<!--[if IE 8 ]>    <body class=" ie8 "> <![endif]-->
	<!--[if IE 9 ]>    <body class=" ie9 "> <![endif]-->
	<!--[if (gt IE 9)|!(IE)]><!--> 
	<body class="" >
	<!--<![endif]-->

		<div id="dol-skip-navigation">
			<a tabindex="1" id="skip-to-content" href="#content-anchor" class="ux-no-block">Skip to Content</a>	
			<a tabindex="2" 
							id="skip-to-nav" href="#navigation-anchor"
			 class="ux-no-block" >Skip to Navigation</a>
		</div>
			
		<div id="ux-notification-container">
			<div class="ux-content-wrapper">
				<div id="ux-action-required-notifications" class="ux-notice-outer">
						<div class="arn-tray ux-notice-inner">
						</div>
				</div>
				<div id="ux-generic-notifications">
				</div>
			</div>
		</div>
		
		<div id="gov-banner-outer" class="container_16">
			<div id="gov-banner-inner">
				<a href="http://www.ny.gov/"><img id="nys-image" src="<?php echo $versionPath ?>/images/banner_img1.png" alt="NY.gov Portal" /></a>
				<a href="http://www.nysegov.com/citGuide.cfm?superCat=102&cat=449&content=main"><img id="nys-agency-listing" src="<?php echo $versionPath ?>/images/banner_img2.png" alt="State Agency Listing" /></a>
				<!-- search graphic-->
				<a onclick="document.getElementById('sw_searchbox').style.visibility= 'visible'; document.getElementById('searchgraphic').style.visibility= 'hidden';" href="#">
				<img alt="Search all of NY.gov" src="<?php echo $versionPath ?>/images/banner_img3.png" style="float: right; border: medium none; visibility: hidden;" id="searchgraphic"></a>
				<!--state wide search box-->
				<form method="get" action="http://search.cio.ny.gov/" style="float: right; position: relative; top: 2px; left: 155px; visibility: visible;" id="sw_searchbox" target="_blank">
					<p>
						<input type="hidden" name="sort" value="date:D:L:d1" />
						<input type="hidden" name="output" value="xml_no_dtd" />
						<input type="hidden" name="ie" value="UTF-8" />
						<input type="hidden" name="oe" value="UTF-8" />
						<input type="hidden" name="client" value="default_frontend" />
						<input type="hidden" name="proxystylesheet" value="default_frontend" />
						<input type="hidden" name="site" value="default_collection" />
						<label for="searchbox"><input type="text" title="Search" id="searchbox" maxlength="256" name="q" size="15" style="position: relative; top: -10px; cursor: pointer;" /></label>
						<label for="searchbutton"><input type="submit" value="Search NY.GOV" id="searchbutton" style="position: relative; width: 110px; top: -10px;" /></label>
					</p>
				</form>
			<!--end wide search box-->
				<script type="text/javascript">
					// If JavaScript is on, manipulate search control objects.  
					// Otherwise this will be ignored and search controls will be shown by default
					document.getElementById('sw_searchbox').style.visibility = 'hidden';
					document.getElementById('searchgraphic').style.visibility= 'visible';         
				</script> 
			</div>
		</div>
		<div id="dol-header" class="container_16">
			<h1 id="dol-header-nys-labor">
				<a href="http://www.labor.ny.gov" class="accessibility-text">New York State Department of Labor</a>
				<span id="dol-header-application">User Experience (UX) v.0.4.6 Template</span>
			</h1>
			
						
			<div id="site-wide-search">
				<form name="_ipsubmit" id="search-box-form" method="get" action="http://search.cio.ny.gov/search" >
					<label for="q" id="search-label" class="accessibility-text">Search DOL:</label>
					<input type="text" id="q" name="q" value="" size="21" title="Input Search" class="text_box site-wide-search-text-box" placeholder="Search DOL" />
					<input type="submit" title="Submit Search" value="GO" name="submit" class="submit site-wide-search-button accessibility-text" id="search-submit" />
					<input type="hidden" name="entqr" value="0" />
					<input type="hidden" name="ud" value="1" />
					<input type="hidden" name="sort" value="date:D:L:d1" />
					<input type="hidden" name="output" value="xml_no_dtd" />
					<input type="hidden" name="oe" value="UTF-8" />
					<input type="hidden" name="ie" value="UTF-8" />
					<input type="hidden" name="client" value="labor_frontend" />
					<input type="hidden" name="proxystylesheet" value="labor_frontend" />
					<input type="hidden" name="site" value="labor_collection" />
				</form> 
			</div>
			
			
		 	<div id="header-mega-menu">
		   		<div id="mega-menu">
		   			<a name="mega-menu-anchor" id="mega-menu-anchor" tabindex="-1"></a>
		   			<ul id="menu">
						<li class="top-level non-mega"><a href="#">Global Nav</a></li>
		   			</ul>
		   		</div>
			</div>
		</div>
		<div id="page-wrap" class="group">
			<div id="content" class="container_16 group">

				<noscript>
					<div class="grid_16">
						<p class=" ux-msg warning margin-bottom-none">
							<strong>JavaScript is currently disabled in your web browser. </strong> 
								<br />For full functionality of this site, it is necessary to enable JavaScript. 
								Here are <a href="http://www.enable-javascript.com/" target="_blank">
	 							instructions how to enable JavaScript</a>.
						<p>
					</div>	
				</noscript>
				
				<a name="navigation-anchor" id="navigation-anchor" tabindex="-1"></a>
					
				<div id="dol-content-navigation" class="grid_4">					
					<div id="navigation-vertical">
						<ul>
							<li class="first-child">
								<a title="" class=" selected" href="/UX/guides/content/index.php">Navigation Content</a>
							</li>
						</ul>
					</div>				
				</div>
			   	
				<a name="content-anchor" id="content-anchor" tabindex="-1"></a>		
				<div class="grid_12 ux-content-grid ">
					<div id="page-info">
						<ul class="dol-breadcrumbs group">					
							<li>Breadcrumbs</li>
						</ul>
					</div>
					
					<h2>TinyMCE - Javascript WYSIWIG Editor</h2>	
					
					<!-- Start Content -->

					
<form method="post" action="show.php" class="ux-form-top">
        <p>     
				<label for="textarea1" >
					<span>Please state the nature of the medical emergency.</span>
                <textarea id="textarea1" name="textarea1" cols="20" rows="10"> Yes Doctor</textarea>
                </label>
				
				
        </p>
<div class="ux-button-section">
    <div class="ux-button-container">
		<input type="submit" id="button1" name="Submit" class="primary button no-icon">
	</div>
</div>
</form>
					
					
					
					
					
					
					
					
					
								
					<!-- End Content -->

				</div>
			</div>
		</div>	 

		<div id="dol-footer">
			<div id="dol-footer-inner" class="container_12">
				<div id="dol-footer-wrapper">
					<!-- begin global footer area -->
						<ul id="global-footer-menu">
							<li><a href="http://labor.ny.gov/secure/contact/" target="_blank">Contact Us</a></li>
							<li><a href="http://www.labor.ny.gov/agencyinfo/accessibility.shtm" target="_blank">Accessibility Policy</a></li>
							<li><a href="http://labor.ny.gov/privacy.shtm" target="_blank">Privacy Policy</a></li>
							<li><a href="http://labor.ny.gov/utilities/document-readers.shtm" target="_blank">Document Readers</a></li>
						</ul>
					<!-- end global footer area -->
				</div>
			</div>
		</div> <!-- end #footer -->

		<!-- Deferred Scripts -->
		<script type="text/javascript" src="<?php echo $versionPath ?>/js/ux-script.min.js"></script>
			
		<!-- Additional scripts below this line -->
<script type="text/javascript" src="js/tiny_mce/tiny_mce.js"></script>
<script type="text/javascript">
tinyMCE.init({
        mode : "textareas"
});
</script>
	</body>
</html>