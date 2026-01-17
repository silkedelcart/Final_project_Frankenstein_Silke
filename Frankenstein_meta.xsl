<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs tei"
    version="2.0">
    
    <!-- <xsl:output method="xml" omit-xml-declaration="yes" indent="yes" /> -->

    
    <xsl:template match="tei:TEI">
                     <div class="row">
                         <div class="col-12 col-lg-6">
                             <table class="metadata-table">
                                <h2 class='metadata-title'>Manuscript page metadata</h2>
                                 <tr>
                                     <th>About the manuscript page:</th>
                                     <td><xsl:value-of select="//tei:sourceDesc"/></td>
                                 </tr>
                                 <tr>
                                     <th>Licence:</th>
                                     <td><xsl:value-of select="//tei:licence"/></td>
                                 </tr>
                                 <tr>
                                     <th>Publisher:</th>
                                     <td><xsl:value-of select="//tei:publisher"/></td>
                                 </tr>
                                 <tr>
                                     <th>Date of creation:</th>
                                     <td><xsl:value-of select="//tei:date"/></td>
                                 </tr>
                                 <tr>
                                     <th>Author:</th>
                                     <td><xsl:value-of select="//tei:author"/></td>
                                 </tr>
                                 <tr>
                                     <th>Editor:</th>
                                     <td><xsl:value-of select="//tei:editor"/></td>
                                 </tr>
                             </table>
                         </div>
                         <div class="col-12 col-lg-6">
                                <h2 class='metadata-title'>Modification statistics</h2>
                            <ul class='mod-stats'> 
                                <li>Total number of modifications: 
                                    <xsl:value-of select="count(//tei:del|//tei:add)" /> <!-- Counts all the add and del elements, and puts it in a list item -->
                                </li>
                                <li>Number of additions:
                                    <xsl:value-of select="count(//tei:add)" /> 
                                    <!-- count the additions only -->
                                </li>
                                <li>Number of deletions:
                                    <xsl:value-of select="count(//tei:del)" /> 
                                    <!-- count the deletions only -->
                                </li>
                                <li>Number of modifications by Percy:
                                    <xsl:value-of select="count(//tei:del[@hand='#PBS']|//tei:add[@hand='#PBS'])" /> 
                                    <!-- count the modifications made by Percy Bysshe Shelley only -->
                                </li>
                                <li>Number of modifications by Mary:
                                    <xsl:value-of select="count(//tei:del[@hand='#MWS']|//tei:add[@hand='#MWS'])" /> 
                                    <!-- count the modifications made by Mary Wollstonecraft Shelley only -->
                                </li>
                            </ul>
                        </div>
                     </div>
        <hr/>
    </xsl:template>
    

</xsl:stylesheet>
